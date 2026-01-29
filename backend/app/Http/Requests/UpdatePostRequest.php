<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id' => ['required', 'int'],
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'id.required' => 'Post id is required.',
            'id.int' => 'Post id must be integer.',
            'title.required' => 'Title is required.',
            'title.string' => 'Title must be a string.',
            'title.max' => 'Title must be at most 255 characters.',
            'content.required' => 'Content is required.',
            'content.string' => 'Content must be a string.',
        ];
    }
}
