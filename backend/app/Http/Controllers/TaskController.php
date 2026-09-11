<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $tasks = $request->user()
            ->tasks()
            ->latest()
            ->get();

        return response()->json([
            'tasks' => $tasks,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => [
                'required',
                'string',
                'max:255',
            ],

            'description' => [
                'nullable',
                'string',
            ],

            'category' => [
                'nullable',
                'string',
                'max:100',
            ],

            'priority' => [
                'required',
                'in:Low,Medium,High',
            ],

            'status' => [
                'required',
                'in:Pending,In Progress,Completed',
            ],

            'due_date' => [
                'nullable',
                'date',
            ],
        ]);

        $task = $request->user()
            ->tasks()
            ->create($validated);

        return response()->json([
            'message' => 'Task created successfully.',
            'task' => $task,
        ], 201);
    }

    public function show(Request $request, Task $task)
    {
        $this->checkOwnership($request, $task);

        return response()->json([
            'task' => $task,
        ]);
    }

    public function update(
        Request $request,
        Task $task
    ) {
        $this->checkOwnership($request, $task);

        $validated = $request->validate([
            'title' => [
                'required',
                'string',
                'max:255',
            ],

            'description' => [
                'nullable',
                'string',
            ],

            'category' => [
                'nullable',
                'string',
                'max:100',
            ],

            'priority' => [
                'required',
                'in:Low,Medium,High',
            ],

            'status' => [
                'required',
                'in:Pending,In Progress,Completed',
            ],

            'due_date' => [
                'nullable',
                'date',
            ],
        ]);

        $task->update($validated);

        return response()->json([
            'message' => 'Task updated successfully.',
            'task' => $task,
        ]);
    }

    public function destroy(
        Request $request,
        Task $task
    ) {
        $this->checkOwnership($request, $task);

        $task->delete();

        return response()->json([
            'message' => 'Task deleted successfully.',
        ]);
    }

    private function checkOwnership(
        Request $request,
        Task $task
    ) {
        if ($task->user_id !== $request->user()->id) {
            abort(403, 'You are not allowed to access this task.');
        }
    }
}