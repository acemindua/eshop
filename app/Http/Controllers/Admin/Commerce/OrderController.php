<?php

namespace App\Http\Controllers\Admin\Commerce;

use App\Filters\OrderFilter;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Http\Resources\ItemResource;
use App\Http\Resources\OrderResource;
use App\Models\Item;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    /**
     * Display a paginated list of orders.
     * * Uses OrderFilter for scoping and OrderResource for consistent 
     * data transformation before sending to the Inertia frontend.
     */
    public function index(OrderFilter $filter): Response
    {
        Gate::authorize('viewAny', Order::class);

        $orders = Order::filter($filter)
            ->with(['user']) // Optimization: Eager load relations to avoid N+1 queries
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Commerce/Orders/Index', [
            'data' => [
                'orders' => OrderResource::collection($orders)
            ],
            'filters' => request()->only(['search', 'status']),
        ]);
    }

    /**
     * Show the creation form.
     */
    public function create(): Response
    {
        Gate::authorize('create', Order::class);
        //
        return Inertia::render('Admin/Commerce/Orders/Create', [
            'data' => []
        ]);
    }

    /**
     * Store a newly created order.
     */
    public function store(StoreOrderRequest $request): RedirectResponse
    {
        Gate::authorize('create', Order::class);

        $order = Order::create($request->validated());

        return redirect()->route('admin.orders.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "Order #{$order->id} successfully created!",
            ],
        ]);
    }

    /**
     * Display detailed information about a specific order.
     */
    public function show(Order $order): Response
    {
        Gate::authorize('view', $order);

        // Ensure the resource is used here for consistency with Index
        return Inertia::render('Admin/Commerce/Orders/Show', [
            'data' => [
                'order' => new OrderResource($order->load(['user', 'items']))
            ],
        ]);
    }

    /**
     * Show the edit form for an existing order.
     */
    public function edit(Order $order): Response
    {
        Gate::authorize('update', $order);

        return Inertia::render('Admin/Commerce/Orders/Edit', [
            'data' => [
                'order' => new OrderResource($order)
            ]
        ]);
    }

    /**
     * Update the order details in the database.
     */
    public function update(UpdateOrderRequest $request, Order $order): RedirectResponse
    {
        Gate::authorize('update', $order);

        // Using update() is cleaner than fill() + save()
        $order->update($request->validated());

        return redirect()->route('admin.orders.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "Order #{$order->id} successfully updated!",
            ],
        ]);
    }

    /**
     * Permanently remove the order and associated media.
     */
    public function destroy(Order $order): RedirectResponse
    {
        // Changed to 'delete' policy to match standard naming conventions
        Gate::authorize('delete', $order);

        if (method_exists($order, 'clearMediaCollection')) {
            $order->clearMediaCollection('images');
        }

        $order->delete();

        // Fixed route name: admin.order.index -> admin.orders.index
        return redirect()->route('admin.orders.index')->with([
            'alert' => [
                'type' => 'success',
                'message' => "Order successfully deleted!",
            ],
        ]);
    }
}
