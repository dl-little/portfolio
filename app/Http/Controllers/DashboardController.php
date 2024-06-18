<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\SettingResource;
use App\Models\Project;
use App\Models\Setting;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
		$projects = ProjectResource::collection( Project::all() );
		$settings = SettingResource::collection( Setting::all() );
        return Inertia::render('Dashboard', compact(['projects', 'settings']));
    }
}
