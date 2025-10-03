import React, { useEffect, useRef } from 'react'

const About = () => {
  const companyStats = [
    { value: "1 Million+", label: "Registered Users" },
    { value: "98%", label: "User Satisfaction Rate" },
    { value: "10,000+", label: "Published Recipes" }
  ];

  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      const statCards = statsRef.current.querySelectorAll('.stat-card');
      statCards.forEach((card) => {
        observer.observe(card);
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section 
        className="about-hero text-white py-5 mb-4 position-relative overflow-hidden"
        style={{
          backgroundSize: '400% 400%',
          animation: 'gradientShift 15s ease infinite'
        }}
      >
        {/* Animated background particles */}
        <div 
          className="position-absolute w-100 h-100"
          style={{
            background: 'radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
            animation: 'float 20s ease-in-out infinite'
          }}
        />
        
        <div className="container text-center position-relative" style={{ zIndex: 2 }}>
          <h2 
            className="display-5 fw-bold mb-3"
            style={{
              animation: 'fadeInUp 1s ease-out',
              textShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}
          >
            About RecipeVault
          </h2>
          <p 
            className="lead mx-auto"
            style={{ 
              maxWidth: 700,
              animation: 'fadeInUp 1s ease-out 0.3s both',
              textShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}
          >
            RecipeVault is your personal vault for discovering, saving, and sharing recipes from every corner of the world. Whether you're a home cook or a food explorer, our platform makes it easy to build your own collection, connect with a vibrant community, and enjoy a seamless cooking experience. Your feedback and creativity help shape RecipeVault into the ultimate destination for food lovers.
          </p>
        </div>

        <style jsx>{`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </section>

      <section className="about-stats container mb-5">
        <div ref={statsRef} className="row justify-content-center g-4">
          {companyStats.map((stat, idx) => (
            <div key={idx} className="col-6 col-md-4">
              <div 
                className="stat-card card shadow-sm border-0 text-center py-4 h-100 position-relative overflow-hidden"
                style={{
                  opacity: 0,
                  transform: 'translateY(50px)',
                  transition: 'all 0.6s ease-out',
                  transitionDelay: `${idx * 0.2}s`,
                  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                  borderRadius: '20px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                }}
              >
                {/* Animated background gradient on hover */}
                <div 
                  className="position-absolute w-100 h-100"
                  style={{
                    background: 'linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    top: 0,
                    left: 0
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '0';
                  }}
                />
                
                <div className="position-relative" style={{ zIndex: 2 }}>
                  <div 
                    className="display-6 fw-bold"
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      animation: 'pulse 2s ease-in-out infinite'
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-muted mt-2" style={{ fontSize: '1.1rem' }}>
                    {stat.label}
                  </div>
                </div>

                {/* Decorative elements */}
                <div 
                  className="position-absolute"
                  style={{
                    top: '-10px',
                    right: '-10px',
                    width: '30px',
                    height: '30px',
                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                    borderRadius: '50%',
                    opacity: 0.1,
                    animation: 'rotate 10s linear infinite'
                  }}
                />
                <div 
                  className="position-absolute"
                  style={{
                    bottom: '-15px',
                    left: '-15px',
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(45deg, #f093fb, #f5576c)',
                    borderRadius: '50%',
                    opacity: 0.1,
                    animation: 'rotate 8s linear infinite reverse'
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <style jsx>{`
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </section>

      <section 
        className="about-values py-5 position-relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        }}
      >
        {/* Animated background elements */}
        <div 
          className="position-absolute"
          style={{
            top: '10%',
            left: '5%',
            width: '200px',
            height: '200px',
            background: 'linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
            borderRadius: '50%',
            animation: 'float 15s ease-in-out infinite'
          }}
        />
        <div 
          className="position-absolute"
          style={{
            bottom: '10%',
            right: '5%',
            width: '150px',
            height: '150px',
            background: 'linear-gradient(45deg, rgba(240, 147, 251, 0.1), rgba(245, 87, 108, 0.1))',
            borderRadius: '50%',
            animation: 'float 12s ease-in-out infinite reverse'
          }}
        />

        <div className="container position-relative" style={{ zIndex: 2 }}>
          <h3 
            className="fw-bold mb-4 text-center"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontSize: '2.5rem',
              animation: 'fadeInUp 1s ease-out'
            }}
          >
            Our Values
          </h3>
          <div className="row g-4 justify-content-center">
            {[
              { title: "User-Centered", description: "Your feedback shapes our platform, ensuring a seamless and satisfying experience for all.", icon: "👥", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
              { title: "Diverse Recipes", description: "We celebrate culinary traditions from around the world, inspiring you every day.", icon: "🌍", gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
              { title: "Community Joy", description: "We foster a vibrant foodie community where sharing and discovery bring joy to all.", icon: "❤️", gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" }
            ].map((value, idx) => (
              <div key={idx} className="col-md-4">
                <div 
                  className="value-card card h-100 border-0 text-center p-4 position-relative overflow-hidden"
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '25px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    opacity: 0,
                    transform: 'translateY(30px)',
                    animation: `fadeInUp 0.8s ease-out ${idx * 0.2}s both`,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-15px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)';
                  }}
                >
                  {/* Hover gradient overlay */}
                  <div 
                    className="position-absolute w-100 h-100"
                    style={{
                      background: value.gradient,
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      top: 0,
                      left: 0
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.05';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '0';
                    }}
                  />

                  <div className="position-relative" style={{ zIndex: 2 }}>
                    <div 
                      className="mb-3"
                      style={{
                        fontSize: '3rem',
                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                        animation: 'bounce 2s ease-in-out infinite'
                      }}
                    >
                      {value.icon}
                    </div>
                    <h4 
                      className="mb-3 fw-bold"
                      style={{
                        background: value.gradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        fontSize: '1.5rem'
                      }}
                    >
                      {value.title}
                    </h4>
                    <p className="text-muted mb-0" style={{ lineHeight: '1.6' }}>
                      {value.description}
                    </p>
                  </div>

                  {/* Decorative corner elements */}
                  <div 
                    className="position-absolute"
                    style={{
                      top: '15px',
                      right: '15px',
                      width: '20px',
                      height: '20px',
                      background: value.gradient,
                      borderRadius: '50%',
                      opacity: 0.1,
                      animation: 'pulse 3s ease-in-out infinite'
                    }}
                  />
                  <div 
                    className="position-absolute"
                    style={{
                      bottom: '15px',
                      left: '15px',
                      width: '15px',
                      height: '15px',
                      background: value.gradient,
                      borderRadius: '50%',
                      opacity: 0.1,
                      animation: 'pulse 2s ease-in-out infinite'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
          }
        `}</style>
      </section>
    </>
  );
};

export default About;
