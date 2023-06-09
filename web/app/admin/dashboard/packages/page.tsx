"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { redirect } from "next/navigation";

function createData(
  name: string,
  unique: number,
  city: string,
  school: string,
  stdents: number,
  date: string,
  actions: string
) {
  return { name, unique, city, school, stdents, date, actions };
}

const rows = [
  createData(
    "امیر حقیقی",
    2614589,
    "شیراز",
    "مدرسه شماره یک",
    2,
    "21 اردیبهشت 1402",
    "مشاهده"
  ),
];

const page = () => {
  return (
    <div className="w-full my-5">
      <div className="w-full flex gap-3 my-3">
        <h1 className="pt-1">مدیریت پکیج ها</h1>
        <Button
          variant="contained"
          onClick={() => redirect("/admin/dashboard/packages/add")}>
          پکیج جدید
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">نام</TableCell>
              <TableCell align="right">کد یکتا</TableCell>
              <TableCell align="right">شهر</TableCell>
              <TableCell align="right">مدرسه</TableCell>
              <TableCell align="right">دانش آموزان</TableCell>
              <TableCell align="right">ثبت نام</TableCell>
              <TableCell align="right">عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.unique}</TableCell>
                <TableCell align="right">{row.city}</TableCell>
                <TableCell align="right">{row.school}</TableCell>
                <TableCell align="right">{row.stdents}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell
                  align="right"
                  className="text-sky-500 font-semibold">
                  {row.actions}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default page;
