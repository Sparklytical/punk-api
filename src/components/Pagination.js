/**
 *
 * Pagination
 *
 */

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
// import './Pagination.scss';

const Paged = styled.ul`
  flex-direction: row;
  color: #373737;
  display: flex;
  width: 50vw;
  height: 80px;
  line-height: 80px;
  margin: 3rem auto;
  background-color: white;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.25);
  align-items: center;
`;

const PagedLi = styled.li`
  flex: 1;
  list-style: none;
  text-align: center;
  position: relative;
  font-size: 20px;
  font-weight: bold;
  transition: 0.5s ease;
  cursor: pointer;
  user-select: none;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: rgba(white, 0.25);
    color: #3892e3;
  }
`;

const Pagination = ({ beersPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / beersPerPage); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <Paged className="Paged">
        {pageNumbers.map((number) => (
          <PagedLi key={number} className="page-item">
            <option onClick={() => paginate(number)} className="page-link">
              {number}
            </option>
          </PagedLi>
        ))}
      </Paged>
    </nav>
  );
};

Pagination.propTypes = {
  beersPerPage: PropTypes.number.isRequired,
  totalPosts: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
};
export default Pagination;
