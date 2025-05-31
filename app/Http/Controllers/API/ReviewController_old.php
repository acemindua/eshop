<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\JsonResponse; // Додано: Імпорт для type hinting JsonResponse
use Illuminate\Support\Facades\Log; // Додано: Імпорт для логування помилок

class ReviewController extends Controller
{
    // Видалено: Інжекція ReviewRatableContract та конструктор.
    // Цей пакет зазвичай не потребує такого сервісного шару для взаємодії.

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

    /**
     * Отримати всі відгуки для певної сутності.
     */
    public function index(string $reviewableType, int $reviewableId): JsonResponse
    {
        try {
            $reviewable = $this->findReviewableModel($reviewableType, $reviewableId);
            // Виправлено: Змінено 'user' на 'reviewer' для коректного завантаження користувача
            $reviews = $reviewable->reviews()->with('reviewer')->approved()->latest()->paginate(10);
            return response()->json($reviews);
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
     * Створити новий відгук для сутності.
     */
    public function store(Request $request, string $reviewableType, int $reviewableId): JsonResponse
    {
        try {
            // Перевіряємо, чи користувач автентифікований
            if (!Auth::check()) {
                return response()->json(['message' => 'Unauthenticated.'], 401);
            }

            $reviewable = $this->findReviewableModel($reviewableType, $reviewableId);

            $request->validate([
                'title' => 'nullable|string|max:255',
                'review' => 'required|string',
                'rating' => 'required|integer|min:1|max:5', // Загальний рейтинг
            ]);

            // Перевіряємо, чи користувач вже залишив відгук для цієї сутності
            if ($reviewable->reviews()->where('reviewer_id', Auth::id())->where('reviewer_type', get_class(Auth::user()))->exists()) {
                return response()->json(['message' => 'You have already reviewed this item.'], 409); // Conflict
            }

            // user_id автоматично прив'яже reviewer_id та reviewer_type завдяки HasReviews трейту на моделі User
            $reviewable->addReview([
                'title' => $request->title,
                'review' => $request->review,
                'user_id' => Auth::id(),
                'approved' => config('review-rateable.default_approved_status', true),
                'ratings' => [
                    'overall' => $request->rating,
                ],
            ]);

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
     * Оновити відгук.
     */
    public function update(Request $request, string $reviewableType, int $reviewableId, int $reviewId): JsonResponse
    {
        try {
            // Перевірка на автентифікацію
            if (!Auth::check()) {
                return response()->json(['message' => 'Unauthenticated.'], 401);
            }

            $reviewable = $this->findReviewableModel($reviewableType, $reviewableId);
            // Завантажуємо відгук і перевіряємо його належність по reviewer_id та reviewer_type
            $review = $reviewable->reviews()->where('id', $reviewId)->firstOrFail();

            if ($review->reviewer_id !== Auth::id() || $review->reviewer_type !== get_class(Auth::user())) {
                return response()->json(['message' => 'Unauthorized to update this review.'], 403);
            }

            $request->validate([
                'title' => 'nullable|string|max:255',
                'review' => 'required|string',
                'rating' => 'required|integer|min:1|max:5',
            ]);

            $reviewable->updateReview($reviewId, [
                'title' => $request->title,
                'review' => $request->review,
                'ratings' => [
                    'overall' => $request->rating,
                ],
            ]);

            return response()->json(['message' => 'Review updated successfully!']);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        } catch (\LogicException $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        } catch (\Exception $e) {
            Log::error("Error updating review {$reviewId} for {$reviewableType}/{$reviewableId}: " . $e->getMessage());
            return response()->json(['message' => 'Error updating review: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Видалити відгук.
     */
    public function destroy(string $reviewableType, int $reviewableId, int $reviewId): JsonResponse
    {
        try {
            // Перевірка на автентифікацію
            if (!Auth::check()) {
                return response()->json(['message' => 'Unauthenticated.'], 401);
            }

            $reviewable = $this->findReviewableModel($reviewableType, $reviewableId);
            // Завантажуємо відгук і перевіряємо його належність по reviewer_id та reviewer_type
            $review = $reviewable->reviews()->where('id', $reviewId)->firstOrFail();

            if ($review->reviewer_id !== Auth::id() || $review->reviewer_type !== get_class(Auth::user())) {
                return response()->json(['message' => 'Unauthorized to delete this review.'], 403);
            }

            $reviewable->deleteReview($reviewId);

            return response()->json(['message' => 'Review deleted successfully!']);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        } catch (\LogicException $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        } catch (\Exception $e) {
            Log::error("Error deleting review {$reviewId} for {$reviewableType}/{$reviewableId}: " . $e->getMessage());
            return response()->json(['message' => 'Error deleting review: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Отримати середній рейтинг та кількість відгуків для сутності.
     */
    public function getAverageRating(string $reviewableType, int $reviewableId): JsonResponse
    {
        try {
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
}
