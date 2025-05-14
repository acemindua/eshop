<?php

namespace App\Http\Controllers\App\Commerce;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    function __construct(public int $pages = 15,  public array $data = []) {}

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        Gate::authorize('viewAny', Order::class);

        return Inertia::render(
            'App/Commerce/Orders/Index',
            [
                'data' => $this->data
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        Gate::authorize('create', Order::class);
        return Inertia::render(
            'App/Commerce/Orders/Create',
            [
                'data' => $this->data
            ]
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request): RedirectResponse
    {
        Gate::authorize('create', Order::class);
        return redirect()->route('admin.orders.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order): Response
    {
        Gate::authorize('view', $order);
        return Inertia::render(
            'App/Commerce/Orders/Show',
            [
                'data' => $this->data
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order): Response
    {
        Gate::authorize('update', $order);
        return Inertia::render(
            'App/Commerce/Orders/Edit',
            [
                'data' => $this->data
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order): RedirectResponse
    {
        Gate::authorize('update', $order);
        return redirect()->route('admin.orders.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order): RedirectResponse
    {
        Gate::authorize('delete', $order);
        return redirect()->route('admin.orders.index');
    }
}
