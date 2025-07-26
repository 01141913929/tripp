import { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Navbar,
  Dropdown,
  Nav
} from 'react-bootstrap';
import {
  FaGlobe,
  FaBus,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock
} from 'react-icons/fa';

import IMG from "../assets/suv.png"
import IMG2 from "../assets/suv.png"

const AboutUs = () => {
  const [lang, setLang] = useState('ar');
  
  // Color scheme matching your app
  const colors = {
    primary: '#4F46E5',
    secondary: '#10B981',
    accent: '#F59E0B',
    light: '#F3F4F6',
    dark: '#1F2937',
    background: '#F9FAFB'
  };

  // Translations
  const translations = {
    ar: {
      title: "وصلني",
      subtitle: "تعرف على شركتنا وخدماتنا",
      aboutTitle: "شركة وصلني للنقل السياحي",
      aboutText: "نحن شركة متخصصة في مجال النقل السياحي في مصر، نقدم خدمات نقل متميزة بين المطارات والمدن السياحية الرئيسية. لدينا أسطول حديث من السيارات والسائقين المحترفين.",
      servicesTitle: "خدماتنا",
      services: [
        "نقل من المطارات إلى الفنادق",
        "جولات سياحية يومية",
        "حجوزات سيارات مع سائق",
        "خدمات النقل للمجموعات"
      ],
      contactTitle: "اتصل بنا",
      address: "الغردقة، مصر",
      phone: "+201551927216",
      email: "mohamedhafiza1234@gmail.com",
      hours: "24/7",
      teamTitle: "فريقنا",
      languages: {
        ar: "العربية",
        en: "الإنجليزية",
        cn: "الصينية"
      }
    },
    en: {
      title: "Wasalny",
      subtitle: "Learn about our company and services",
      aboutTitle: "Wasalny Tourism Transport Company",
      aboutText: "We are a specialized tourist transportation company in Egypt, providing premium transfer services between airports and major tourist cities. We have a modern fleet of vehicles and professional drivers.",
      servicesTitle: "Our Services",
      services: [
        "Airport to hotel transfers",
        "Daily tour services",
        "Chauffeur-driven car rentals",
        "Group transportation services"
      ],
      contactTitle: "Contact Us",
      address: "Hurghada, Egypt",
      phone: "+201551927216",
      email: "mohamedhafiza1234@gmail.com",
      hours: "24/7",
      teamTitle: "Our Team",
      languages: {
        ar: "Arabic",
        en: "English",
        cn: "Chinese"
      }
    },
    cn: {
      title: "Wasalny",
      subtitle: "了解我们的公司和服务",
      aboutTitle: "Wasalny旅游运输公司",
      aboutText: "我们是埃及专业的旅游交通公司，提供机场与主要旅游城市之间的优质接送服务。我们拥有现代化的车队和专业司机。",
      servicesTitle: "我们的服务",
      services: [
        "机场到酒店接送",
        "每日旅游服务",
        "司机驾驶汽车租赁",
        "团体交通服务"
      ],
      contactTitle: "联系我们",
      address: "埃及赫尔格达",
      phone: "+201551927216",
      email: "mohamedhafiza1234@gmail.com",
      hours: "24/7",
      teamTitle: "我们的团队",
      languages: {
        ar: "阿拉伯语",
        en: "英语",
        cn: "中文"
      }
    }
  };
  const t = translations[lang] || translations['ar'];

  // Team members data
  const teamMembers = [
    {
      name: lang === 'ar' ? "فاطنه حوسني" : lang === 'cn' ? "胡斯尼的诱惑" : "Fatna Hosny",
      position: lang === 'ar' ? "المدير العام" : lang === 'cn' ? "总经理" : "General Manager",
      image: {IMG2}
    },
    {
      name: lang === 'ar' ? "محمد عبد الرحيم" : lang === 'cn' ? "穆罕默德·阿卜杜勒·拉希姆" : "Mohamed Abd El Raheem",
      position: lang === 'ar' ? "مدير العمليات" : lang === 'cn' ? "运营经理" : "Operations Manager",
      image: {IMG2}
    }
  ];

  return (
    <div className="min-vh-100" style={{ 
      backgroundColor: colors.background,
      backgroundImage: 'radial-gradient(at 40% 20%, hsla(240,100%,90%,0.3) 0px, transparent 50%)',
      position: 'relative'
    }}>
      {/* Navigation */}
      <Navbar expand="lg" className="shadow-sm" style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)'
      }}>
        <Container>
          <Navbar.Brand className="fw-bold" style={{ color: colors.primary }}>
            <FaBus className="me-2" />
            {t.title}
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Dropdown>
              <Dropdown.Toggle 
                variant="outline-primary" 
                className="d-flex align-items-center"
                style={{ borderColor: colors.primary, color: colors.primary }}
              >
                <FaGlobe className="me-2" />
                {t.languages[lang]}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setLang('ar')} active={lang === 'ar'}>
                  {t.languages.ar}
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setLang('en')} active={lang === 'en'}>
                  {t.languages.en}
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setLang('cn')} active={lang === 'cn'}>
                  {t.languages.cn}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>

      <Container className="py-5">
        {/* Hero Section */}
        <Row className="justify-content-center mb-5">
          <Col lg={10}>
            <Card className="border-0 shadow-lg" style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              border: `2px solid ${colors.primary}20`,
              overflow: 'hidden'
            }}>
              <div style={{
                height: '8px',
                background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                width: '100%'
              }} />
              <Card.Body className="text-center py-5 px-4">
                <h1 className="display-5 fw-bold mb-3" style={{ color: colors.primary }}>
                  {t.title}
                </h1>
                <p className="lead mb-4" style={{ color: colors.dark }}>
                  {t.subtitle}
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* About Company Section */}
        <Row className="justify-content-center mb-5">
          <Col lg={10}>
            <Card className="border-0 shadow-lg mb-4" style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              border: `2px solid ${colors.primary}20`
            }}>
              <Card.Body className="p-4">
                <h2 className="mb-4" style={{ color: colors.primary }}>{t.aboutTitle}</h2>
                <p className="mb-4" style={{ color: colors.dark }}>
                  {t.aboutText}
                </p>
                
                <div className="row mt-4">
                  <div className="col-md-6">
                    <Image 
                      src={IMG}
                      alt="Our Company" 
                      fluid 
                      rounded 
                      className="mb-3"
                    />
                  </div>
                  <div className="col-md-6">
                    <h3 style={{ color: colors.secondary }}>{t.servicesTitle}</h3>
                    <ul className="list-unstyled">
                      {t.services.map((service, index) => (
                        <li key={index} className="mb-2 d-flex align-items-center">
                          <span className="me-2" style={{ color: colors.secondary }}>✓</span>
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Team Section */}
        <Row className="justify-content-center mb-5">
          <Col lg={10}>
            <Card className="border-0 shadow-lg mb-4" style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              border: `2px solid ${colors.primary}20`
            }}>
              <Card.Body className="p-4">
                <h2 className="mb-4 text-center" style={{ color: colors.primary }}>{t.teamTitle}</h2>
                <Row className="g-4">
                  {teamMembers.map((member, index) => (
                    <center><Col key={index} md={4}>
                      <Card className="h-100 border-0 text-center">
                        <Image 
                          src={member.image} 
                          alt={member.name}
                          roundedCircle
                          className="mx-auto my-3"
                          style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                        />
                        <Card.Body>
                          <h5>{member.name}</h5>
                          <p className="text-muted">{member.position}</p>
                        </Card.Body>
                      </Card>
                    </Col></center>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Contact Section */}
        <Row className="justify-content-center">
          <Col lg={10}>
            <Card className="border-0 shadow-lg" style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              border: `2px solid ${colors.primary}20`
            }}>
              <Card.Body className="p-4">
                <h2 className="mb-4" style={{ color: colors.primary }}>{t.contactTitle}</h2>
                <Row>
                  <Col md={4} className="mb-3">
                    <div className="d-flex align-items-center">
                      <FaMapMarkerAlt className="me-3" style={{ color: colors.secondary }} />
                      <div>
                        <h5>{lang === 'ar' ? "العنوان" : lang === 'cn' ? "地址" : "Address"}</h5>
                        <p>{t.address}</p>
                      </div>
                    </div>
                  </Col>
                  <Col md={4} className="mb-3">
                    <div className="d-flex align-items-center">
                      <FaPhone className="me-3" style={{ color: colors.secondary }} />
                      <div>
                        <h5>{lang === 'ar' ? "الهاتف" : lang === 'cn' ? "电话" : "Phone"}</h5>
                        <p>{t.phone}</p>
                      </div>
                    </div>
                  </Col>
                  <Col md={4} className="mb-3">
                    <div className="d-flex align-items-center">
                      <FaEnvelope className="me-3" style={{ color: colors.secondary }} />
                      <div>
                        <h5>Email</h5>
                        <p>{t.email}</p>
                      </div>
                    </div>
                  </Col>
                  <Col md={4} className="mb-3">
                    <div className="d-flex align-items-center">
                      <FaClock className="me-3" style={{ color: colors.secondary }} />
                      <div>
                        <h5>{lang === 'ar' ? "ساعات العمل" : lang === 'cn' ? "营业时间" : "Working Hours"}</h5>
                        <p>{t.hours}</p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutUs;