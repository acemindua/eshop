<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;


class HomeController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Web/Home', []);
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
                                'id'        => $product->id,
                                'title'     => $product->title,
                                'slug'      => $variant->slug,
                                'sku'       => $variant->sku,
                                'price'     => $variant->price,
                                'quantity'  => $variant->quantity,
                                'images'    => $product->sorted_images,
                                'status'    => $variant->public ? true : false,
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

        /* $product = Product::whereTranslation('slug', $slug)->first();

        if (!$product) { // Перевірка на null, якщо продукт не знайдений
            $variant = ProductVariant::where('slug', $slug)->first();

            if ($variant) { // Перевірка, чи існує варіант
                $product = $variant->product; // Отримуємо продукт через варіант

                // Оновлюємо атрибут 'title' з додатковою інформацією
                $product->title = $product->title . " (" . $variant->attribute_value_title . ")";
                $product->slug = $variant->slug;
            }
        }
 */
        return Inertia::render(
            'Main/Commerce/PrdoductShow',
            [
                'data' => [
                    'item' =>  new ProductResource($product)
                ]
            ]
        );
    }
}
