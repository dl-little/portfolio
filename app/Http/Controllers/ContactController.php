<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Spatie\Valuestore\Valuestore;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $values = Valuestore::make(config_path('settings.json'))->all();
        return Inertia::render('Contact', compact('values'));
    }
}
