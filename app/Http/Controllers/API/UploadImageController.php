<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class UploadImageController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'upload' => 'required|image|max:2048', // Перевіряємо, що файл - це зображення і його розмір не більше 2МБ
        ]);

        if ($request->hasFile('upload') && $request->file('upload')->isValid()) {

            $file = $request->file('upload');
            $extension = $file->getClientOriginalExtension();

            // Унікальне ім'я для файлу (уникнемо конфліктів)
            $fileName = Str::uuid() . '.' . $extension;
            $request->file('upload')->move(public_path('storage/images'), $fileName);
            $url = asset('storage/images/' . $fileName);
            return response()->json([
                'url' => $url,
            ], 201);
        }

        return response()->json([
            'error' => 'Invalid file upload',
        ], 400);
    }
}
