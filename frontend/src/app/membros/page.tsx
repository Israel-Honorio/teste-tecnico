"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/axios";

function Membros() {
  const [membros, setMembros] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMembros = async () => {
      try {
        const response = await api.get(`/membros?page=${page}&limit=5`); // altere o limit conforme desejado
        setMembros(response.data.data);
        setTotalPages(response.data.meta.totalPages);
      } catch (error) {
        console.error("Erro ao buscar membros:", error);
      }
    };

    fetchMembros();
  }, [page]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Lista de Membros</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200 text-left">
              <th className="py-3 px-4 border-b">Nome</th>
              <th className="py-3 px-4 border-b">Email</th>
              <th className="py-3 px-4 border-b">Profissão</th>
            </tr>
          </thead>
          <tbody>
            {membros.map((membro: any) => (
              <tr key={membro.id} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="py-3 px-4 border-b">{membro.nome}</td>
                <td className="py-3 px-4 border-b">{membro.email}</td>
                <td className="py-3 px-4 border-b">{membro.profissao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span>
          Página {page} de {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50"
        >
          Próxima
        </button>
      </div>
    </div>
  );
}

export default Membros;