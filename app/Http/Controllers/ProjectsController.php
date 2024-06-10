<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Http\Resources\ProjectResource;

class ProjectsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     */
    public function index(): Response
    {
        $projects = ProjectResource::collection( Project::all() );
        return Inertia::render('Projects/Index', compact('projects'));
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create(): Response
    {
        return Inertia::render('Projects/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     *
     * @return RedirectResponse
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'title' => 'required|string|max:225|min:3',
            'image' => 'required|image',
            'github_url' => 'nullable|string|max:225|min:3',
            'keywords' => 'nullable|string|max:225|min:3',
            'description' => 'nullable|string|max:225|min:3',
        ]);
 
        if ( ! $request->hasFile('image') || ! $request->exists('title') ) {
            return back();
        }

        $image = $request->file('image')->store('projects');

        Project::create([
            'title' => $request->title,
            'image' => $image,
            'github_url' => $request->github_url,
            'keywords' => $request->keywords,
            'description' => $request->description,
        ]);
 
        return redirect(route('projects.index'));
    }
}
