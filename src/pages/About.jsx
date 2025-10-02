import React from 'react'

const About = () => {
  const companyStats = [
    { value: "1 Million+", label: "Registered Users" },
    { value: "98%", label: "User Satisfaction Rate" },
    { value: "10,000+", label: "Published Recipes" }
  ];

  return (
    <>
      <section className="about-hero bg-success text-white py-5 mb-4">
        <div className="container text-center">
          <h2 className="display-5 fw-bold mb-3">About RecipeVault</h2>
          <p className="lead mx-auto" style={{ maxWidth: 700 }}>
            RecipeVault is your personal vault for discovering, saving, and sharing recipes from every corner of the world. Whether you're a home cook or a food explorer, our platform makes it easy to build your own collection, connect with a vibrant community, and enjoy a seamless cooking experience. Your feedback and creativity help shape RecipeVault into the ultimate destination for food lovers.
          </p>
        </div>
      </section>

      <section className="about-stats container mb-5">
        <div className="row justify-content-center g-4">
          {companyStats.map((stat, idx) => (
            <div key={idx} className="col-6 col-md-4">
              <div className="card shadow-sm border-0 text-center py-4 h-100">
                <div className="display-6 fw-bold text-success">{stat.value}</div>
                <div className="text-muted">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-values bg-light py-5">
        <div className="container">
          <h3 className="fw-bold mb-4 text-center">Our Values</h3>
          <div className="row g-4 justify-content-center">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm text-center p-4">
                <h4 className="text-success mb-2">User-Centered</h4>
                <p>Your feedback shapes our platform, ensuring a seamless and satisfying experience for all.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm text-center p-4">
                <h4 className="text-success mb-2">Diverse Recipes</h4>
                <p>We celebrate culinary traditions from around the world, inspiring you every day.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm text-center p-4">
                <h4 className="text-success mb-2">Community Joy</h4>
                <p>We foster a vibrant foodie community where sharing and discovery bring joy to all.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
