<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'image' => asset( '/storage/' . $this->image ),
            'github_url' => $this->github_url,
            'keywords' => $this->keywords,
            'description' => $this->description,
            'is_hosted' => $this->is_hosted
        ];
    }
}
