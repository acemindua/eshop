<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ManufacturerResource;
use App\Http\Resources\ProductResource;
use App\Http\Resources\ProductVariantResource;
use App\Models\Category;
use App\Models\Manufacturer;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;


class HomeController extends Controller
{
    public function index(Request $request): Response
    {


        $categories = Category::where('public', true)->whereNull('category_id')
            ->orderBy('order')
            ->with('childs')
            ->translatedIn(app()->getLocale()) // Перевіряємо, що є переклад
            ->with(['childs' => function ($query) {
                $query->orderBy('order')
                    ->translatedIn(app()->getLocale()) // Перевіряємо, що є переклад
                    ->where('public', true);  // Додаємо умову до відносин
            }])
            ->get();


        $queryProducts = Product::query()->where('public', true)->orderBy('order')->with('variants');

        $itemsNoVariants = (clone $queryProducts)->doesntHave('variants')->get();
        $itemsWithVariants = (clone $queryProducts)->has('variants')->get();

        $items = collect(); // Ініціалізація колекції

        // Додаємо товари без варіантів
        if ($itemsNoVariants->isNotEmpty()) {
            $items = $items->merge(
                ProductResource::collection($itemsNoVariants)->map(function ($item) {
                    return $item; // Використовуємо $item без toArray() для правильного форматування
                })
            );
        }

        // Додаємо товари з варіантами
        if (!empty($itemsWithVariants)) {
            foreach ($itemsWithVariants as $product) {

                if ($product['variants']->isNotEmpty()) {
                    foreach ($product['variants'] as $variant) {

                        $items->push([
                            'data' => [
                                'id' => $product->id,
                                'title' => $product->title . " (" . $variant->attribute_value_title . ")",
                                'slug' => $variant->slug,
                                'image' => $variant->image,
                                'images' => $product->sorted_images
                            ]
                        ]);
                    }
                }
            }
        }

        return Inertia::render(
            'Main/Home',
            [
                'data' => [
                    'items' => $items,
                    'categories' => CategoryResource::collection($categories),
                    //'manufacturers' => ManufacturerResource::collection($manufacturers),
                    //'products' => ProductVariantResource::collection($productVariant)  //ProductResource::collection($products)
                ]
            ]
        );
        /*
        $manufacturers = Manufacturer::where('public', true)->get();


        $productVariant = ProductVariant::query()->where('public', true)->orderBy('public', 'desc')
            ->latest('updated_at')
            ->paginate(14)
            ->withQueryString(); */

        //$products = $productVariant;

        //if (!empty($product['variants'])) { // Перевіряємо, чи є варіанти у продукту
        //    foreach ($product['variants'] as $variant) {
        //$items = $items->merge(
        //    collect([$product])
        //);
        //   }
        // }

        //$items = $items->merge(
        //    ProductResource::collection($itemsWithVariants)
        //);

        //dd($items);





        /* $doesntHaveVariants = ProductResource::collection(->get());
        $variants = $active->has('variants')->get();

        $items = collect();

        if ($doesntHaveVariants->isNotEmpty()) {
            $items = $items->merge($doesntHaveVariants);
        }

        foreach ($variants as $key => $variant) {


            $items->push($variant);
        }

        dd($variants); */
    }

    /**
     * 
     */

    public function category(string $slug): Response
    {
        $category = Category::whereTranslation('slug', $slug)->with('products')->first();

        $queryProducts = Product::query()->where('public', true)->where('category_id', $category->id)->orderBy('order')->with('variants');

        $itemsNoVariants = (clone $queryProducts)->doesntHave('variants')->get();
        $itemsWithVariants = (clone $queryProducts)->has('variants')->get();

        $items = collect(); // Ініціалізація колекції

        // Додаємо товари без варіантів
        if ($itemsNoVariants->isNotEmpty()) {
            $items = $items->merge(
                ProductResource::collection($itemsNoVariants)->map(function ($item) {
                    return $item; // Використовуємо $item без toArray() для правильного форматування
                })
            );
        }

        // Додаємо товари з варіантами
        if (!empty($itemsWithVariants)) {
            foreach ($itemsWithVariants as $product) {

                if ($product['variants']->isNotEmpty()) {
                    foreach ($product['variants'] as $variant) {

                        $items->push([
                            'data' => [
                                'id' => $product->id,
                                'title' => $product->title . " (" . $variant->attribute_value_title . ")",
                                'slug' => $variant->slug,
                                'image' => $variant->image,
                                'images' => $product->sorted_images
                            ]
                        ]);
                    }
                }
            }
        }
        return Inertia::render(
            'Main/Commerce/Category',
            [
                'data' => [
                    'item' => new CategoryResource($category),
                    'items' => $items,
                ],
            ]
        );
    }

    public function show(string $slug, int $id): Response
    {

        $product = Product::whereTranslation('slug', $slug)->first();

        if (!$product) { // Перевірка на null, якщо продукт не знайдений
            $variant = ProductVariant::where('slug', $slug)->first();

            if ($variant) { // Перевірка, чи існує варіант
                $product = $variant->product; // Отримуємо продукт через варіант

                // Оновлюємо атрибут 'title' з додатковою інформацією
                $product->title = $product->title . " (" . $variant->attribute_value_title . ")";
                $product->slug = $variant->slug;
            }
        }

        return Inertia::render(
            'Main/Commerce/Show',
            [
                'data' => [
                    'item' => new ProductResource($product)
                ]
            ]
        );
    }
}
