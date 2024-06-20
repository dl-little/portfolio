<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Spatie\Valuestore\Valuestore;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $home_content = Valuestore::make(config_path('settings.json'))->allStartingWith('home');
        return Inertia::render('Home', compact('home_content'));
    }
}
