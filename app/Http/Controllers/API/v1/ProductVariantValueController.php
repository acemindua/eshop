<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\ProductVariantValue;
use App\Http\Requests\StoreProductVariantValueRequest;
use App\Http\Requests\UpdateProductVariantValueRequest;

class ProductVariantValueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductVariantValueRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ProductVariantValue $productVariantValue)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductVariantValueRequest $request, ProductVariantValue $productVariantValue)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductVariantValue $productVariantValue)
    {
        //
    }
}
