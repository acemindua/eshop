<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Daaner\NovaPoshta\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NovaPoshtaController extends Controller
{
    /**
     * Приватний метод для отримання ключа з БД
     */
    private function getApiKeyFromDb()
    {
        $shipping = DB::table('shippings')
            ->where('alias', 'nova_poshta')
            ->where('is_active', true)
            ->first();

        if (!$shipping) return null;

        $settings = json_decode($shipping->settings, true);
        return $settings['api_key'] ?? null;
    }

    public function getCities(Request $request)
    {
        try {
            // Отримуємо ключ автоматично
            $key = $this->getApiKeyFromDb();

            if (empty($key)) {
                return response()->json(['error' => 'Nova Poshta API key not found in settings'], 400);
            }

            $address = new Address();
            $address->setApi($key);

            $search = $request->get('q', '');
            $search = preg_replace('/^(місто|м\.|село|с\.|смт)\s+/iu', '', $search);

            $result = $address->searchSettlements($search);

            if (isset($result['success']) && $result['success']) {
                $addresses = $result['result'][0]['Addresses'] ?? [];

                $formatted = collect($addresses)->map(fn($city) => [
                    'ref' => $city['DeliveryCity'],
                    'present' => $city['Present'],
                ]);

                return response()->json($formatted);
            }

            return response()->json([]);
        } catch (\Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getWarehouses(Request $request)
    {
        try {
            $key = $this->getApiKeyFromDb();
            $cityRef = $request->get('city_ref');
            $search = $request->get('search');

            if (empty($key) || empty($cityRef)) return response()->json([]);

            $address = new Address();
            $address->setApi($key);
            $address->setLimit(500);

            $result = $address->getWarehouses($cityRef, false, $search);

            if (isset($result['success']) && $result['success']) {
                $formatted = collect($result['result'])->map(fn($w) => [
                    'ref' => $w['Ref'],
                    'name' => $w['Description'],
                ]);
                return response()->json($formatted);
            }
            return response()->json([]);
        } catch (\Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
