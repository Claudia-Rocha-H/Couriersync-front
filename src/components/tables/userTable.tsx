'use client';

import { useState } from 'react';
import { BaseTable } from '@/components/ui/table'; 
import { IGetUsers } from '@/types/users';

interface Props {
  users: IGetUsers[];
  onEdit: (user: IGetUsers) => void;
  onDelete: (userId: number) => void;
}

export default function UserTable({ users, onEdit, onDelete }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const totalPages = Math.ceil(users.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentUsers = users.slice(startIndex, startIndex + rowsPerPage);

  const columns = [
    { key: 'name', label: 'Nombre' },
    { key: 'user_id', label: 'ID' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Rol', render: (user: IGetUsers) => user.role.charAt(0).toUpperCase() + user.role.slice(1) },
  ];

  const actions = [
    {
      label: 'Editar',
      onClick: (user: IGetUsers) => onEdit(user),
      className: 'text-blue-600',
    },
    {
      label: 'Borrar',
      onClick: (user: IGetUsers) => onDelete(user.user_id),
      className: 'text-red-600',
    },
  ];

  return (
    <BaseTable
      columns={columns}
      data={currentUsers}
      actions={actions}
      noDataText="No se encontraron usuarios."
      currentPage={currentPage}
      totalPages={totalPages}
      rowsPerPage={rowsPerPage}
      onPageChange={(direction) => {
        if (direction === 'prev' && currentPage > 1) setCurrentPage(currentPage - 1);
        if (direction === 'next' && currentPage < totalPages) setCurrentPage(currentPage + 1);
      }}
      onRowsPerPageChange={(count) => {
        setRowsPerPage(count);
        setCurrentPage(1);
      }}
    />
  );
}

