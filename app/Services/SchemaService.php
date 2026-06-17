<?php

namespace App\Services;

use App\Facades\Settings;
use Spatie\SchemaOrg\Schema;
use Spatie\SchemaOrg\Graph;
use App\Models\Item;
use App\Models\Category;
use Diglactic\Breadcrumbs\Breadcrumbs;
use Illuminate\Support\Facades\Cache;

class SchemaService
{
    private const CACHE_TTL = 3600; // 1 година

    /** */
    public function generateGraph(array $entities): array
    {
        $graph = new Graph();
        $graph->add(
            Schema::organization()
                ->name(config('app.name'))
                ->url(config('app.url'))
                ->logo(asset('logo.png'))
        );


        foreach ($entities as $entity) {
            $graph->add($entity);
        }


        return $graph->toArray();
    }

    /** */
    public function forProduct(Item $item): \Spatie\SchemaOrg\Product
    {
        $key = "schema_product_{$item->id}_" . app()->getLocale();

        return Cache::remember($key, self::CACHE_TTL, function () use ($item) {

            $productSchema = Schema::product()
                ->name($item->title)
                ->url(route('resolve.route', ['slug' => $item->slug]))
                ->description($item->meta_description ?? $item->description)
                ->sku((string) $item->id);

            // ✅ images
            if ($item->sorted_images) {
                $productSchema->image(
                    collect($item->sorted_images)
                        ->pluck('url')
                        ->filter()
                        ->values()
                        ->toArray()
                );
            }

            // brand
            if ($item->brand) {
                $productSchema->brand(
                    Schema::brand()->name($item->brand->title)
                );
            }

            // category
            if ($item->category) {
                $productSchema->category($item->category->title);
            }

            // offers
            $productSchema->offers(
                Schema::offer()
                    ->price($item->price)
                    ->priceCurrency('UAH')
                    ->availability(
                        $item->quantity > 0
                            ? 'https://schema.org/InStock'
                            : 'https://schema.org/OutOfStock'
                    )
                    ->itemCondition('https://schema.org/NewCondition')
                    ->priceValidUntil(now()->addMonth()->toDateString())
                    //
                    ->setProperty('hasMerchantReturnPolicy', [
                        '@type' => 'MerchantReturnPolicy',
                        'applicableCountry' => 'UA',
                        'returnPolicyCategory' => 'https://schema.org/MerchantReturnFiniteReturnWindow',
                        'merchantReturnDays' => 14,
                        'returnMethod' => 'https://schema.org/ReturnByMail',
                        'returnFees' => 'https://schema.org/FreeReturn',
                    ])
                    //
                    ->shippingDetails(
                        Schema::offerShippingDetails()
                            ->shippingRate(
                                Schema::monetaryAmount()
                                    ->value(0)
                                    ->currency('UAH')
                            )
                            ->shippingDestination(
                                Schema::definedRegion()
                                    ->addressCountry('UA')
                            )
                            ->deliveryTime(
                                Schema::shippingDeliveryTime()
                                    ->handlingTime(
                                        Schema::quantitativeValue()
                                            ->minValue(0)
                                            ->maxValue(1)
                                            ->unitCode('DAY')
                                    )
                                    ->transitTime(
                                        Schema::quantitativeValue()
                                            ->minValue(1)
                                            ->maxValue(3)
                                            ->unitCode('DAY')
                                    )
                            )
                    )
            );

            // reviews
            $ratingCount = $item->ratingCounts();
            $averageRating = $item->overallAverageRating();

            if ($ratingCount > 0 && $averageRating) {

                $productSchema->aggregateRating(
                    Schema::aggregateRating()
                        ->ratingValue((float) $averageRating)
                        ->ratingCount((int) $ratingCount)
                        ->bestRating(5)
                        ->worstRating(1)
                );
            }

            return $productSchema;
        });
    }


    /** */
    public function forCategory(Category $category): \Spatie\SchemaOrg\CollectionPage
    {
        // Отримуємо товари (без кешування всього об'єкта Schema)
        $allIds = $category->getAllChildrenIds();
        $items = Item::query()->where('public', true)->whereIn('category_id', $allIds)
            ->limit(Settings::get('items_per_page', 16))
            ->get();

        // Створюємо список елементів
        $listItems = $items->map(function ($item, $index) {
            return Schema::listItem()
                ->position($index + 1)
                ->url(route('resolve.route', ['slug' => $item->slug]))
                ->name($item->title);
        })->toArray();

        // Створюємо ItemList окремо
        $itemList = Schema::itemList()->itemListElement($listItems);

        // Повертаємо CollectionPage
        return Schema::collectionPage()
            ->name($category->title)
            ->url(route('resolve.route', ['slug' => $category->slug]))
            ->description($category->description ?? "Category products: " . $category->title)
            ->mainEntity($itemList);
    }
    public function generateBreadcrumbs(): \Spatie\SchemaOrg\BreadcrumbList
    {
        $key = "breadcrumbs_" . md5(request()->fullUrl()) . "_" . app()->getLocale();

        return Cache::remember($key, self::CACHE_TTL, function () {
            $breadcrumbs = Breadcrumbs::generate();
            $list = [];
            foreach ($breadcrumbs as $index => $breadcrumb) {
                $list[] = Schema::listItem()
                    ->position($index + 1)
                    ->name($breadcrumb->title)
                    ->item($breadcrumb->url);
            }
            return Schema::breadcrumbList()->itemListElement($list);
        });
    }
}
