<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PaymentMethod;
use App\Http\Requests\StorePaymentMethodRequest;
use App\Http\Requests\UpdatePaymentMethodRequest;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class PaymentMethodController extends Controller
{
    /**
     * Список методів оплати.
     */
    public function index()
    {
        return Inertia::render('Admin/Settings/PaymentMethods/Index', [
            'paymentMethods' => PaymentMethod::orderBy('sort_order')->paginate(10),
        ]);
    }

    /**
     * Форма створення.
     */
    public function create()
    {
        return Inertia::render('Admin/Settings/PaymentMethods/Create');
    }

    /**
     * Збереження нового методу.
     */
    public function store(StorePaymentMethodRequest $request)
    {
        // Пакет Translatable автоматично розбереться з масивами даних (ua, en)
        PaymentMethod::create($request->validated());

        return Redirect::route('admin.settings.payment-methods.index')
            ->with('success', __('Payment method created successfully.'));
    }

    /**
     * Редагування методу (з підвантаженням усіх трансляцій).
     */
    public function edit(PaymentMethod $paymentMethod)
    {
        return Inertia::render('Admin/Settings/PaymentMethods/Edit', [
            'paymentMethod' => $paymentMethod->load('translations'),
        ]);
    }

    /**
     * Оновлення.
     */
    public function update(UpdatePaymentMethodRequest $request, PaymentMethod $paymentMethod)
    {
        $paymentMethod->update($request->validated());

        return Redirect::route('admin.settings.payment-methods.index')
            ->with('success', __('Payment method updated successfully.'));
    }

    /**
     * Видалення.
     */
    public function destroy(PaymentMethod $paymentMethod)
    {
        $paymentMethod->delete();

        return Redirect::route('admin.settings.payment-methods.index')
            ->with('success', __('Payment method deleted.'));
    }
}
