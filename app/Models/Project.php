<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'image',
        'github_url',
        'keywords',
        'description',
        'is_hosted'
    ];

    protected $casts = [
        'is_hosted' => 'boolean'
    ];
}
