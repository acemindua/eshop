<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        //
        //return response()->json($request->all(), 201);
        $reviewableType = $request->model;
        $reviewableId = $request->model_id;
        try {
            $reviewable = $this->findReviewableModel($reviewableType, $reviewableId);
            $reviews = $reviewable->reviews()->latest()->paginate(10);
            return response()->json([
                'reviews' => $reviews,
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        } catch (\LogicException $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        } catch (\Exception $e) {
            // Логування помилки для діагностики
            Log::error("Error fetching reviews for {$reviewableType}/{$reviewableId}: " . $e->getMessage());
            return response()->json(['message' => 'Error fetching reviews: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Отримати середній рейтинг та кількість відгуків для сутності.
     */
    public function getAverageRating(Request $request): JsonResponse
    {
        try {
            $reviewableType = $request->model;
            $reviewableId = $request->model_id;

            $reviewable = $this->findReviewableModel($reviewableType, $reviewableId);
            return response()->json([
                'average_rating' => $reviewable->overallAverageRating(),
                'reviews_count' => $reviewable->reviews()->approved()->count(),
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        } catch (\LogicException $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        } catch (\Exception $e) {
            Log::error("Error fetching average rating for {$reviewableType}/{$reviewableId}: " . $e->getMessage());
            return response()->json(['message' => 'Error fetching average rating: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        //
        try {

            $user = User::find($request->user_id);

            if (!$user) {
                return response()->json(['message' => 'Unauthenticated.'], 401);
            }

            $reviewableType = $request->model;
            $reviewableId = $request->model_id;
            //

            $request->validate([
                'title' => 'nullable|string|max:255',
                'review' => 'nullable|string',
                'rating' => 'required|integer|min:1|max:5', // Загальний рейтинг
            ]);

            $reviewable = $this->findReviewableModel($reviewableType, $reviewableId);
            // return response()->json(, 201);

            // Перевіряємо, чи користувач вже залишив відгук для цієї сутності
            if ($reviewable->getReviews()->where('user_id', $request->user_id)->count() > 0) {
                return response()->json(['message' => 'You have already reviewed this item.'], 409); // Conflict
            }

            $reviewable->addReview([
                'title' => $request->title,
                'review' => $request->review,
                'approved' => config('review-rateable.default_approved_status', true),
                'ratings' => [
                    'overall' => $request->rating,
                ],
            ], $request->user_id);


            return response()->json(['message' => 'Review added successfully!'], 201);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        } catch (\LogicException $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        } catch (\Exception $e) {
            Log::error("Error adding review for {$reviewableType}/{$reviewableId}: " . $e->getMessage());
            return response()->json(['message' => 'Error adding review: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    /**
     * Динамічно знаходить "reviewable" модель.
     *
     * @param string $reviewableType Наприклад, 'products', 'articles'
     * @param int $reviewableId ID моделі
     * @return \Illuminate\Database\Eloquent\Model
     * @throws ModelNotFoundException
     * @throws \LogicException
     */
    protected function findReviewableModel(string $reviewableType, int $reviewableId): \Illuminate\Database\Eloquent\Model
    {
        // Перетворюємо тип на назву моделі (наприклад, 'products' -> 'Product')
        // Переконайтеся, що ви правильно мапінгуєте назви
        $modelClass = 'App\\Models\\' . Str::singular(Str::studly($reviewableType));

        if (!class_exists($modelClass)) {
            throw new ModelNotFoundException("Model class not found for type: {$reviewableType}");
        }

        $model = app($modelClass)->find($reviewableId);

        if (!$model) {
            throw new ModelNotFoundException("{$modelClass} with ID {$reviewableId} not found.");
        }

        // Перевірка, чи модель використовує трейт ReviewRateable
        if (!in_array('Codebyray\\ReviewRateable\\Traits\\ReviewRateable', class_uses($model))) {
            throw new \LogicException("Model {$modelClass} does not use ReviewRateable trait.");
        }

        return $model;
    }
}
