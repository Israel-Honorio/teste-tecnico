"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/axios";

function Posts() {
  // Estado para armazenar a lista de posts, o ID do post aberto, a página atual e o total de páginas
  const [posts, setPosts] = useState([]);
  const [openPostId, setOpenPostId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Efeito para buscar os posts quando a página é alterada
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Faz uma requisição GET para a API para buscar os posts com paginação
        const response = await api.get(`/posts?page=${page}&limit=5`); // altere o limit conforme desejado
        setPosts(response.data.data);
        setTotalPages(response.data.meta.totalPages);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      }
    };

    fetchPosts();
  }, [page]); // Dependência para atualizar a lista de posts quando a página mudar

  // Função para alternar a exibição do conteúdo de um post
  // Se o post já estiver aberto, fecha-o; caso contrário, abre o post com
  const togglePost = (id: number) => {
    setOpenPostId(openPostId === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Lista de Postagens</h1>

      <div className="space-y-4">
        {posts.map((post: any) => (
          <div
            key={post.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => togglePost(post.id)}
              className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none"
            >
              <div>
                <h2 className="text-lg font-semibold">{post.titulo}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {post.autor?.nome} •{" "}
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>
              <span className="text-xl">
                {openPostId === post.id ? "−" : "+"}
              </span>
            </button>

            {openPostId === post.id && (
              <div className="px-4 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                {post.texto}
              </div>
            )}
          </div>
        ))}
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

export default Posts;
