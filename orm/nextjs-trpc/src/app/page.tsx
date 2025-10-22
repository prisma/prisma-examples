'use client';
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/utils/trpc';

export default function Home() {

	const trpc = useTRPC();

	const [newTodoText, setNewTodoText] = useState('');

	const todos = useQuery(trpc.todo.getAll.queryOptions());

	const createMutation = useMutation(trpc.todo.create.mutationOptions({
		onSuccess: () => {
			setNewTodoText('');
			todos.refetch();
		},
	}));

	const toggleMutation = useMutation(trpc.todo.toggle.mutationOptions({
		onSuccess: () => todos.refetch(),
	}));

	const deleteMutation = useMutation(trpc.todo.delete.mutationOptions({
		onSuccess: () => todos.refetch(),
	}));

	const handleAddTodo = (e: React.FormEvent) => {
		e.preventDefault();
		if (newTodoText.trim()) {
			createMutation.mutate({ text: newTodoText });
		}
	};

	return (
		<main className="mx-auto w-full max-w-xl px-4 py-10">
			<h1 className="text-center text-3xl font-semibold tracking-tight">Todos</h1>
			<form onSubmit={handleAddTodo} className="mt-8 flex gap-2">
				<input
					type="text"
					value={newTodoText}
					onChange={(e) => setNewTodoText(e.target.value)}
					placeholder="Add a new task..."
					disabled={createMutation.isPending}
					className="flex-1 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none ring-0 transition focus:border-blue-400"
				/>
				<button
					type="submit"
					disabled={createMutation.isPending || !newTodoText.trim()}
					className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
				>
					{createMutation.isPending ? 'Adding...' : 'Add'}
				</button>
			</form>

			<section className="mt-6">
				{todos.isLoading ? (
					<div className="py-6 text-center text-sm">Loading...</div>
				) : todos.data?.length === 0 ? (
					<p className="py-6 text-center text-sm">No todos yet. Add one above.</p>
				) : (
					<ul className="divide-y overflow-hidden rounded-md border">
						{todos.data?.map((todo) => (
							<li key={todo.id} className="flex items-center justify-between gap-3 px-3 py-2">
								<label className="flex flex-1 cursor-pointer items-center gap-3">
									<input
										type="checkbox"
										checked={todo.completed}
										onChange={() =>
											toggleMutation.mutate({ id: todo.id, completed: !todo.completed })
										}
										className="h-4 w-4"
									/>
									<span className={`text-sm ${todo.completed ? 'line-through' : ''}`}>
										{todo.text}
									</span>
								</label>
								<button
									onClick={() => deleteMutation.mutate({ id: todo.id })}
									aria-label={`Delete "${todo.text}"`}
									className="text-sm text-red-600 transition hover:text-red-700"
								>
									Delete
								</button>
							</li>
						))}
					</ul>
				)}
			</section>
		</main>
	);
}
