<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Spatie\Valuestore\Valuestore;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $values = Valuestore::make(config_path('settings.json'))->all();
		$projects = ProjectResource::collection( Project::all() );
        return Inertia::render('Dashboard', compact(['projects', 'values']));
    }
}
