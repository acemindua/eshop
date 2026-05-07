<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Shipping;
use App\Http\Resources\ShippingResource;
use App\Http\Requests\StoreShippingRequest;
use App\Http\Requests\UpdateShippingRequest;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class ShippingController extends Controller
{
    /**
     * Список усіх служб доставки.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Shipping/Index', [
            'shippings' => ShippingResource::collection(
                Shipping::orderBy('sort_order')->get()
            ),
        ]);
    }

    /**
     * Форма редагування конкретної служби.
     */
    public function edit(Shipping $shipping): Response
    {
        return Inertia::render('Admin/Shipping/Edit', [
            'shipping' => new ShippingResource($shipping),
        ]);
    }

    /**
     * Оновлення налаштувань служби.
     */
    public function update(UpdateShippingRequest $request, Shipping $shipping): RedirectResponse
    {
        $data = $request->validated();

        if ($shipping->slug === 'nova-poshta' && !empty($data['api_key'])) {
            // Використовуємо метод set, який ми щойно додали
            // Він оновить БД і сам почистить кеш
            \App\Facades\Settings::set('nova_poshta_key', $data['api_key']);

            unset($data['api_key']);
        }

        $shipping->update($data);

        return redirect()->route('admin.shippings.index')
            ->with('success', "Налаштування успішно оновлено.");
    }

    /**
     * Швидке перемикання статусу (is_active) через AJAX/Inertia.
     */
    public function toggle(Shipping $shipping): RedirectResponse
    {
        $shipping->update(['is_active' => !$shipping->is_active]);

        return back()->with('success', 'Статус доставки змінено.');
    }

    // Методи create/store/destroy зазвичай не використовуються для типів доставки, 
    // оскільки вони жорстко прописані в логіці (нова пошта, укрпошта тощо).
}
