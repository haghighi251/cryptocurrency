"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
  name: string,
  unique: number,
  city: string,
  school: string,
  stdents: number,
  score: number,
  date: string,
  actions: string
) {
  return { name, unique, city, school, stdents, score, date, actions };
}

const rows = [
  createData(
    "امیر حقیقی",
    2654289,
    "شیراز",
    "مدرسه شماره یک",
    4,
    4.8,
    "21 اردیبهشت 1402",
    "مشاهده"
  ),
];

const page = () => {
  return (
    <div className="w-full my-5">
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
              <TableCell align="right">امتیاز</TableCell>
              <TableCell align="right">شروع کار</TableCell>
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
                <TableCell align="right">{row.score}</TableCell>
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
