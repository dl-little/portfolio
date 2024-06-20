<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Spatie\Valuestore\Valuestore;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    /**
     * Show the form for editing the specified resource.
     *
     * @param Project $project
     *
     * @return \Inertia\Response
     */
    public function index(): Response
    {
        $values = Valuestore::make(config_path('settings.json'))->all();
        return Inertia::render('Settings', compact('values'));
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
        $valuestore = Valuestore::make(config_path('settings.json'));

        foreach($request->except('_token') as $key => $value ) {
            $valuestore->put($key, $value);
        }

        return redirect('/backofhouse')->with('message', 'Settings Updated.');
    }
}
