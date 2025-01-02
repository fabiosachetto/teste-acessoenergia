"use client";
import { useTarefas } from "../hooks/useTarefas";
import { useState } from "react";
import { TarefaItem } from "../components/tarefaItem";

export default function Home() {
  const { tarefas, loading, error } = useTarefas();
  const [filtro, setFiltro] = useState<string>("todos");

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  const tarefasFiltradas = tarefas.filter(tarefa => {
    if (filtro === "todos") return true;
    return tarefa.status.toLowerCase() === filtro;
  });

  return (
    <div className="container">
      <div className="mb-5 flex justify-between">
        <h2 className="text-lg font-bold uppercase">Tarefas</h2>
        <p className="text-sm font-bold pt-1 px-2 border rounded-lg bg-blue-200 text-blue-600">{tarefasFiltradas.length}</p>
      </div>
      <nav className="mb-5 rounded-lg bg-gray-100 border p-2">
        <ol className="flex text-[12px] md:text-base text-black font-bold text-center justify-items-center">
          <li className={`mr-2 p-2 border rounded-lg w-1/3 hover:text-white hover:bg-slate-500 ${filtro === "todos" ? "bg-slate-500 text-white" : ""}`}>
            <a href="#" className="block" onClick={() => setFiltro("todos")}>Todos</a>
          </li>
          <li className={`mr-2 p-2 border rounded-lg w-1/3 hover:text-white hover:bg-slate-500 ${filtro === "em andamento" ? "bg-slate-500 text-white" : ""}`}>
            <a href="#" className="block" onClick={() => setFiltro("em andamento")}>Em Andamento</a>
          </li>
          <li className={`mr-2 p-2 border rounded-lg w-1/3 hover:text-white hover:bg-slate-500 ${filtro === "concluida" ? "bg-slate-500 text-white" : ""}`}>
            <a href="#" className="block" onClick={() => setFiltro("concluida")}>Concluído</a>
          </li>
        </ol>
      </nav>

      <div className="flex flex-col gap-4">
        {tarefasFiltradas.map((tarefa) => (
          <TarefaItem key={tarefa.id} tarefa={tarefa} />
        ))}
      </div>
    </div>
  );
}