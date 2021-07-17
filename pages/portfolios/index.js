import React from "react";
import axios from "axios";
import Link from "next/link";

import PortfolioCard from "components/portfolios/PortfolioCard";

const graphDeletePortfolio = (id) => {
  const query = `mutation DeletePortfolio {
    deletePortfolio(id: "${id}")
  } `;
  return axios
    .post("http://localhost:3000/graphql", { query })
    .then(({ data: graph }) => graph.data)
    .then((data) => data.deletePortfolio);
};

const graphUpdatePortfolio = (id) => {
  const query = `mutation UpdatePortfolio {
    updatePortfolio(id: "${id}", input: {
      title: "Updated title"
      company: "Updated company"
      companyWebsite: "Updated website"
      location: "Updated location"
      jobTitle: "Updated jobtitle"
      description: "Doing something, programing...."
      startDate: "03/02/2013"
      endDate: "01/02/2015"
    }) {
      _id, title, company, companyWebsite,
      location, jobTitle, description, startDate, endDate
    }
  } `;
  return axios
    .post("http://localhost:3000/graphql", { query })
    .then(({ data: graph }) => graph.data)
    .then((data) => data.updatePortfolio);
};

const graphCreatePortfolio = () => {
  const query = `mutation CreatePortfolio {
    createPortfolio(input: {
      title: "New title"
      company: "New company"
      companyWebsite: "New website"
      location: "New location"
      jobTitle: "New jobtitle"
      description: "Doing something, programing...."
      startDate: "12/12/2011"
      endDate: "10/01/2019"
    }) {
      _id, title, company, companyWebsite,
      location, jobTitle, description, startDate, endDate
    }
  } `;
  return axios
    .post("http://localhost:3000/graphql", { query })
    .then(({ data: graph }) => graph.data)
    .then((data) => data.createPortfolio);
};

const fetchPortfolios = () => {
  const query = `query Portfolios {
                  portfolios { 
                    _id, title, company, companyWebsite, 
                    location, jobTitle, description, startDate, endDate
                  }
                }`;
  return axios
    .post("http://localhost:3000/graphql", { query })
    .then(({ data: graph }) => graph.data)
    .then((data) => data.portfolios);
};

const Portfolios = ({ data }) => {
  const [portfolios, setPortfolios] = React.useState(data.portfolios);

  const createPortfolio = async () => {
    const newPortfolio = await graphCreatePortfolio();
    const newPortfolios = [...portfolios, newPortfolio];
    setPortfolios(newPortfolios);
  };

  const updatePortfolio = async (id) => {
    const updatedPortfolio = await graphUpdatePortfolio(id);
    const index = portfolios.findIndex((p) => p._id === id);
    const newPortfolios = portfolios.slice();
    newPortfolios[index] = updatedPortfolio;
    setPortfolios(newPortfolios);
  };

  const deletePortfolio = async (id) => {
    const deletedId = await graphDeletePortfolio(id);
    const index = portfolios.findIndex((p) => p._id === deletedId);
    const newPortfolios = portfolios.slice();
    newPortfolios.splice(index, 1);
    setPortfolios(newPortfolios);
  };

  return (
    <>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Portfolios</h1>
          </div>
        </div>
        <div onClick={createPortfolio} className="btn btn-primary">
          Create Portfolio
        </div>
      </section>
      <section className="pb-5">
        <div className="row">
          {portfolios.map((portfolio) => (
            <div className="col-md-4" key={portfolio._id}>
              <Link href="/portfolios/[id]" as={`/portfolios/${portfolio._id}`}>
                <a className="card-link">
                  <PortfolioCard portfolio={portfolio} />
                </a>
              </Link>
              <div>
                <button
                  className="btn btn-warning"
                  onClick={() => updatePortfolio(portfolio._id)}
                >
                  Update Portfolio
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deletePortfolio(portfolio._id)}
                >
                  Delete Portfolio
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

Portfolios.getInitialProps = async () => {
  const portfolios = await fetchPortfolios();
  return { data: { portfolios } };
};

export default Portfolios;
