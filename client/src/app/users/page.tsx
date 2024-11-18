"use client";

import {useAppSelector} from "@/app/redux";
import { useGetUsersQuery } from "@/state/api";
import Header from "@/components/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {dataGridClassNames, dataGridSxStyles} from "@/app/lib/utils";

const columns: GridColDef[] = [
    { field: "userId", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
];

const Users = () => {
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
    const { data: users, isError, isLoading } = useGetUsersQuery();

    if (isLoading) {
        return <div className="py-4">Loading...</div>;
    }

    if (isError || !users) {
        return (
            <div className="text-center text-red-500 py-4">Failed to fetch users</div>
        );
    }

    return (
        <div className="flex flex-col">
            <Header name="Users" />
            <DataGrid
                rows={users}
                columns={columns}
                getRowId={(row) => row.userId}
                checkboxSelection
                className={dataGridClassNames}
                sx={dataGridSxStyles(isDarkMode)}
            />
        </div>
    );
};

export default Users;