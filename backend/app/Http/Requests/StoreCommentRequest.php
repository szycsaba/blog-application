<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCommentRequest extends FormRequest
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
            'comment' => ['required', 'string', 'min:1', 'max:5000'],
        ];
    }

    public function messages(): array
    {
        return [
            'comment.required' => 'The comment field is required.',
            'comment.string'   => 'The comment must be a string.',
            'comment.min'      => 'The comment cannot be empty.',
            'comment.max'      => 'The comment may not be greater than :max characters.',
        ];
    }
}
