import React, { useState, useEffect } from "react";
import axios from "axios";
// ─── 導入 SWEETALERT2 ───
import Swal from "sweetalert2";

export default function AdminDashboard() {
  // ─── 🔐 AUTHENTICATION STATES ───
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);

  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingSkills, setLoadingSkills] = useState(true);
  const [loadingExperiences, setLoadingExperiences] = useState(true);

  // ─── 📁 PROJECT FORM STATES ───
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tech, setTech] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [editProjectId, setEditProjectId] = useState(null);
  const [currentImage, setCurrentImage] = useState("");

  // ─── ⚡ SKILL FORM STATES ───
  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState("Advanced");
  const [skillIcon, setSkillIcon] = useState("⚛️");
  const [isEditingSkill, setIsEditingSkill] = useState(false);
  const [editSkillId, setEditSkillId] = useState(null);

  // ─── 💼 EXPERIENCE FORM STATES ───
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [duration, setDuration] = useState("");
  const [expDescription, setExpDescription] = useState("");
  const [isEditingExp, setIsEditingExp] = useState(false);
  const [editExpId, setEditExpId] = useState(null);

  // ─── 🎨 SWEETALERT2 DARK THEME CONFIG ───
  // បង្កើត Custom Class សម្រាប់ជំនួសស្ទីលរបស់ SweetAlert2 ឱ្យទៅជា Dark Mode
  const swalConfig = {
    background: "#0f172a", // bg-slate-900
    color: "#f1f5f9", // text-slate-100
    confirmButtonColor: "#06b6d4", // bg-cyan-500
    cancelButtonColor: "#334155", // bg-slate-700
    customClass: {
      popup: "border border-slate-800 rounded-2xl shadow-xl font-sans",
      title: "text-xl font-bold tracking-wider",
      htmlContainer: "text-slate-400 text-sm",
      confirmButton: "px-5 py-2 rounded-lg font-semibold text-slate-900",
      cancelButton: "px-5 py-2 rounded-lg font-semibold text-white",
    },
  };

  useEffect(() => {
    const savedAuth = localStorage.getItem("admin_auth");
    if (savedAuth === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchProjects();
      fetchSkills();
      fetchExperiences();
    }
  }, [isLoggedIn]);

  // ─── 🔐 LOGIN & LOGOUT HANDLERS ───
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError("");

    if (!username.trim() || !password.trim()) {
      return setLoginError("សូមបំពេញ Username និង Password!");
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    axios
      .post("http://localhost/portfolio-api/login.php", formData)
      .then((res) => {
        if (res.data.success) {
          setIsLoggedIn(true);
          localStorage.setItem("admin_auth", "true");

          // Toast Notification ពេល Login ជោគជ័យ
          Swal.fire({
            ...swalConfig,
            icon: "success",
            title: "ស្វាគមន៍ការត្រឡប់មកវិញ!",
            text: "អ្នកបានចូលប្រព័ន្ធដោយជោគជ័យ។",
            timer: 2000,
            showConfirmButton: false,
          });
        } else {
          setLoginError(
            res.data.message || "Username ឬ Password មិនត្រឹមត្រូវទេ!",
          );
        }
      })
      .catch((err) => {
        console.error(err);
        setLoginError("មានបញ្ហាក្នុងការភ្ជាប់ទៅកាន់ Server!");
      });
  };

  const handleLogout = () => {
    Swal.fire({
      ...swalConfig,
      icon: "question",
      title: "ចាកចេញពីប្រព័ន្ធ?",
      text: "តើអ្នកពិតជាចង់ចាកចេញពីគណនី Admin មែនទេ?",
      showCancelButton: true,
      confirmButtonText: "ចាកចេញ",
      cancelButtonText: "បោះបង់",
      confirmButtonColor: "#ef4444", // ពណ៌ក្រហមសម្រាប់ប៊ូតុងចាកចេញ
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoggedIn(false);
        localStorage.removeItem("admin_auth");
        setUsername("");
        setPassword("");
      }
    });
  };

  // ─── ⚙️ FETCH DATA FUNCTIONS ───
  const fetchProjects = () => {
    axios
      .get("http://localhost/portfolio-api/get_projects.php")
      .then((res) => {
        setProjects(Array.isArray(res.data) ? res.data : []);
        setLoadingProjects(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingProjects(false);
      });
  };

  const fetchSkills = () => {
    axios
      .get("http://localhost/portfolio-api/get_skills.php")
      .then((res) => {
        setSkills(Array.isArray(res.data) ? res.data : []);
        setLoadingSkills(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingSkills(false);
      });
  };

  const fetchExperiences = () => {
    axios
      .get("http://localhost/portfolio-api/get_experiences.php")
      .then((res) => {
        setExperiences(Array.isArray(res.data) ? res.data : []);
        setLoadingExperiences(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingExperiences(false);
      });
  };

  const getIdProperty = (item) => {
    if (!item) return null;
    const idKey = Object.keys(item).find((key) =>
      key.toLowerCase().includes("id"),
    );
    return idKey ? item[idKey] : item.id;
  };

  // ─── 📁 PROJECTS HANDLERS ───
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) setImageFile(e.target.files[0]);
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !tech.trim() || !description.trim()) {
      return Swal.fire({
        ...swalConfig,
        icon: "warning",
        title: "ព័ត៌មានមិនគ្រប់គ្រាន់",
        text: "សូមបំពេញព័ត៌មានក្នុងទម្រង់ឱ្យបានគ្រប់គ្រាន់!",
      });
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("tech", tech);
    formData.append("description", description);
    if (imageFile) formData.append("image", imageFile);

    if (isEditingProject) {
      formData.append("id", editProjectId);
      axios
        .post("http://localhost/portfolio-api/update_project.php", formData)
        .then((res) => {
          if (res.data.success) {
            Swal.fire({
              ...swalConfig,
              icon: "success",
              title: "ធ្វើបច្ចុប្បន្នភាពជោគជ័យ!",
              text: res.data.message,
              timer: 1500,
              showConfirmButton: false,
            });
            fetchProjects();
            resetProjectForm();
          }
        })
        .catch((err) => console.error(err));
    } else {
      axios
        .post("http://localhost/portfolio-api/add_project.php", formData)
        .then((res) => {
          if (res.data.success) {
            Swal.fire({
              ...swalConfig,
              icon: "success",
              title: "រក្សាទុកជោគជ័យ!",
              text: res.data.message,
              timer: 1500,
              showConfirmButton: false,
            });
            fetchProjects();
            resetProjectForm();
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const handleProjectEditClick = (p) => {
    const id = getIdProperty(p);
    setIsEditingProject(true);
    setEditProjectId(id);
    setTitle(p.title);
    setTech(p.tech);
    setDescription(p.description);
    setCurrentImage(p.image || "");
    setImageFile(null);
  };

  const resetProjectForm = () => {
    setIsEditingProject(false);
    setEditProjectId(null);
    setTitle("");
    setTech("");
    setDescription("");
    setImageFile(null);
    setCurrentImage("");
    if (document.getElementById("project-image"))
      document.getElementById("project-image").value = "";
  };

  const handleProjectDelete = (p) => {
    const id = getIdProperty(p);
    Swal.fire({
      ...swalConfig,
      icon: "warning",
      title: "តើអ្នកពិតជាចង់លុបមែនទេ?",
      text: "ទិន្នន័យ Project នេះនឹងត្រូវបាត់បង់ជារៀងរហូត!",
      showCancelButton: true,
      confirmButtonText: "លុបចោល",
      cancelButtonText: "បោះបង់",
      confirmButtonColor: "#ef4444",
    }).then((result) => {
      if (result.isConfirmed) {
        const f = new FormData();
        f.append("id", id);
        axios
          .post("http://localhost/portfolio-api/delete_project.php", f)
          .then((res) => {
            if (res.data.success) {
              Swal.fire({
                ...swalConfig,
                icon: "success",
                title: "បានលុបរួចរាល់!",
                text: res.data.message,
                timer: 1500,
                showConfirmButton: false,
              });
              fetchProjects();
              if (editProjectId === id) resetProjectForm();
            }
          });
      }
    });
  };

  // ─── ⚡ SKILLS HANDLERS ───
  const handleSkillSubmit = (e) => {
    e.preventDefault();
    if (!skillName.trim() || !skillIcon.trim()) {
      return Swal.fire({
        ...swalConfig,
        icon: "warning",
        title: "ព័ត៌មានមិនគ្រប់គ្រាន់",
        text: "សូមបំពេញព័ត៌មានជំនាញឱ្យបានគ្រប់គ្រាន់!",
      });
    }

    const formData = new FormData();
    formData.append("name", skillName);
    formData.append("level", skillLevel);
    formData.append("icon", skillIcon);

    if (isEditingSkill) {
      formData.append("id", editSkillId);
      axios
        .post("http://localhost/portfolio-api/update_skill.php", formData)
        .then((res) => {
          if (res.data.success) {
            Swal.fire({
              ...swalConfig,
              icon: "success",
              title: "កែប្រែជំនាញជោគជ័យ!",
              text: res.data.message,
              timer: 1500,
              showConfirmButton: false,
            });
            fetchSkills();
            resetSkillForm();
          }
        });
    } else {
      axios
        .post("http://localhost/portfolio-api/add_skill.php", formData)
        .then((res) => {
          if (res.data.success) {
            Swal.fire({
              ...swalConfig,
              icon: "success",
              title: "បន្ថែមជំនាញជោគជ័យ!",
              text: res.data.message,
              timer: 1500,
              showConfirmButton: false,
            });
            fetchSkills();
            resetSkillForm();
          }
        });
    }
  };

  const handleSkillEditClick = (s) => {
    const id = getIdProperty(s);
    setIsEditingSkill(true);
    setEditSkillId(id);
    setSkillName(s.name);
    setSkillLevel(s.level || "Advanced");
    setSkillIcon(s.icon || "⚛️");
  };

  const resetSkillForm = () => {
    setIsEditingSkill(false);
    setEditSkillId(null);
    setSkillName("");
    setSkillLevel("Advanced");
    setSkillIcon("⚛️");
  };

  const handleSkillDelete = (s) => {
    const id = getIdProperty(s);
    Swal.fire({
      ...swalConfig,
      icon: "warning",
      title: "លុបជំនាញនេះ?",
      text: "តើអ្នកពិតជាចង់លុបជំនាញនេះចេញពីបញ្ជីមែនទេ?",
      showCancelButton: true,
      confirmButtonText: "លុបចោល",
      cancelButtonText: "បោះបង់",
      confirmButtonColor: "#ef4444",
    }).then((result) => {
      if (result.isConfirmed) {
        const f = new FormData();
        f.append("id", id);
        axios
          .post("http://localhost/portfolio-api/delete_skill.php", f)
          .then((res) => {
            if (res.data.success) {
              Swal.fire({
                ...swalConfig,
                icon: "success",
                title: "បានលុបជំនាញ!",
                text: res.data.message,
                timer: 1500,
                showConfirmButton: false,
              });
              fetchSkills();
            }
          });
      }
    });
  };

  // ─── 💼 EXPERIENCES HANDLERS ───
  const handleExpSubmit = (e) => {
    e.preventDefault();
    if (!role.trim() || !company.trim() || !duration.trim()) {
      return Swal.fire({
        ...swalConfig,
        icon: "warning",
        title: "ព័ត៌មានមិនគ្រប់គ្រាន់",
        text: "សូមបំពេញព័ត៌មានបទពិសោធន៍ឱ្យបានគ្រប់គ្រាន់!",
      });
    }

    const formData = new FormData();
    formData.append("role", role);
    formData.append("company", company);
    formData.append("duration", duration);
    formData.append("description", expDescription);

    if (isEditingExp) {
      formData.append("id", editExpId);
      axios
        .post("http://localhost/portfolio-api/update_experience.php", formData)
        .then((res) => {
          if (res.data.success) {
            Swal.fire({
              ...swalConfig,
              icon: "success",
              title: "កែប្រែទិន្នន័យជោគជ័យ!",
              text: res.data.message,
              timer: 1500,
              showConfirmButton: false,
            });
            fetchExperiences();
            resetExpForm();
          }
        });
    } else {
      axios
        .post("http://localhost/portfolio-api/add_experience.php", formData)
        .then((res) => {
          if (res.data.success) {
            Swal.fire({
              ...swalConfig,
              icon: "success",
              title: "បន្ថែមបទពិសោធន៍ជោគជ័យ!",
              text: res.data.message,
              timer: 1500,
              showConfirmButton: false,
            });
            fetchExperiences();
            resetExpForm();
          }
        });
    }
  };

  const handleExpEditClick = (exp) => {
    const id = getIdProperty(exp);
    setIsEditingExp(true);
    setEditExpId(id);
    setRole(exp.role);
    setCompany(exp.company);
    setDuration(exp.duration);
    setExpDescription(exp.description);
  };

  const resetExpForm = () => {
    setIsEditingExp(false);
    setEditExpId(null);
    setRole("");
    setCompany("");
    setDuration("");
    setExpDescription("");
  };

  const handleExpDelete = (exp) => {
    const id = getIdProperty(exp);
    Swal.fire({
      ...swalConfig,
      icon: "warning",
      title: "លុបបទពិសោធន៍នេះ?",
      text: "តើអ្នកចង់លុបប្រវត្តិការងារនៅក្រុមហ៊ុននេះមែនទេ?",
      showCancelButton: true,
      confirmButtonText: "លុបចោល",
      cancelButtonText: "បោះបង់",
      confirmButtonColor: "#ef4444",
    }).then((result) => {
      if (result.isConfirmed) {
        const f = new FormData();
        f.append("id", id);
        axios
          .post("http://localhost/portfolio-api/delete_experience.php", f)
          .then((res) => {
            if (res.data.success) {
              Swal.fire({
                ...swalConfig,
                icon: "success",
                title: "បានលុបរួចរាល់!",
                text: res.data.message,
                timer: 1500,
                showConfirmButton: false,
              });
              fetchExperiences();
              if (editExpId === id) resetExpForm();
            }
          });
      }
    });
  };

  // ─── 1. ផ្ទាំង LOGIN FORM ───
  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 font-sans text-slate-100">
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-cyan-400 tracking-wider">
              Admin Authentication
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              សូមបញ្ចូលគណនីរបស់អ្នកដើម្បីគ្រប់គ្រងទិន្នន័យ
            </p>
          </div>

          {loginError && (
            <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-400 text-center">
              ⚠️ {loginError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition"
                placeholder="បញ្ចូលឈ្មោះគណនី"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold py-2.5 rounded-lg transition mt-2 shadow-lg shadow-cyan-500/20"
            >
              ចូលប្រព័ន្ធ (Login)
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ─── 2. ផ្ទាំង DASHBOARD (LOGIN រួចរាល់) ───
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* ─── SIDEBAR MENU ─── */}
      <div className="w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold text-cyan-400 mb-8 tracking-wider">
            Admin Panel
          </h2>
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("projects")}
              className={`w-full text-left px-4 py-2.5 rounded-lg font-medium transition ${activeTab === "projects" ? "bg-cyan-500 text-slate-900" : "hover:bg-slate-800 text-slate-400"}`}
            >
              📁 គ្រប់គ្រង Projects
            </button>
            <button
              onClick={() => setActiveTab("skills")}
              className={`w-full text-left px-4 py-2.5 rounded-lg font-medium transition ${activeTab === "skills" ? "bg-cyan-500 text-slate-900" : "hover:bg-slate-800 text-slate-400"}`}
            >
              ⚡ គ្រប់គ្រង Skills
            </button>
            <button
              onClick={() => setActiveTab("experiences")}
              className={`w-full text-left px-4 py-2.5 rounded-lg font-medium transition ${activeTab === "experiences" ? "bg-cyan-500 text-slate-900" : "hover:bg-slate-800 text-slate-400"}`}
            >
              💼 គ្រប់គ្រង Experiences
            </button>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2.5 rounded-lg font-medium border border-red-500/30 text-red-400 hover:bg-red-500/10 transition mt-auto"
        >
          🚪 ចាកចេញ (Logout)
        </button>
      </div>

      {/* ─── MAIN CONTENT AREA ─── */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* ======================= TAB 1: PROJECTS ======================= */}
        {activeTab === "projects" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">
              📁 គ្រប់គ្រងគម្រោង (Projects Management)
            </h1>
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 mb-8 max-w-2xl">
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">
                {isEditingProject
                  ? "📝 កែប្រែព័ត៌មាន Project"
                  : "➕ បន្ថែម Project ថ្មី"}
              </h3>
              <form onSubmit={handleProjectSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    ឈ្មោះ Project
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    បច្ចេកវិទ្យាប្រើប្រាស់
                  </label>
                  <input
                    type="text"
                    value={tech}
                    onChange={(e) => setTech(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    រូបភាពគម្រោង
                  </label>
                  <input
                    id="project-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    ការពិពណ៌នា
                  </label>
                  <textarea
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                  ></textarea>
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-semibold px-5 py-2 rounded-lg transition"
                  >
                    {isEditingProject ? "រក្សាទុក" : "បន្ថែម"}
                  </button>
                  {isEditingProject && (
                    <button
                      type="button"
                      onClick={resetProjectForm}
                      className="bg-slate-700 px-5 py-2 rounded-lg"
                    >
                      បោះបង់
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
              {loadingProjects ? (
                <div className="p-8 text-center text-gray-400">កំពុងដើរ...</div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-800 text-slate-300 border-b border-slate-700">
                      <th className="p-4">រូបភាព</th>
                      <th className="p-4">ឈ្មោះ Project</th>
                      <th className="p-4">បច្ចេកវិទ្យា</th>
                      <th className="p-4 text-center">សកម្មភាព</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {projects.map((p, i) => (
                      <tr
                        key={getIdProperty(p) || i}
                        className="hover:bg-slate-800/50"
                      >
                        <td className="p-4">
                          {p.image ? (
                            <img
                              src={`http://localhost/portfolio-api/uploads/${p.image}`}
                              className="w-16 h-10 object-cover rounded"
                              alt=""
                            />
                          ) : (
                            "No Img"
                          )}
                        </td>
                        <td className="p-4 font-medium">{p.title}</td>
                        <td className="p-4 text-cyan-400">{p.tech}</td>
                        <td className="p-4 text-center space-x-4">
                          <button
                            onClick={() => handleProjectEditClick(p)}
                            className="text-yellow-500 hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleProjectDelete(p)}
                            className="text-red-500 hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* ======================= TAB 2: SKILLS ======================= */}
        {activeTab === "skills" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">
              ⚡ គ្រប់គ្រងជំនាញ (Skills Management)
            </h1>
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 mb-8 max-w-2xl">
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">
                {isEditingSkill ? "📝 កែប្រែជំនាញ" : "➕ បន្ថែមជំនាញថ្មី"}
              </h3>
              <form onSubmit={handleSkillSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    ឈ្មោះជំនាញ
                  </label>
                  <input
                    type="text"
                    value={skillName}
                    onChange={(e) => setSkillName(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    កម្រិតជំនាញ
                  </label>
                  <select
                    value={skillLevel}
                    onChange={(e) => setSkillLevel(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white"
                  >
                    <option value="Advanced">Advanced</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Beginner">Beginner</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    រូបតំណាង (Emoji)
                  </label>
                  <input
                    type="text"
                    value={skillIcon}
                    onChange={(e) => setSkillIcon(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-semibold px-5 py-2 rounded-lg"
                  >
                    {isEditingSkill ? "រក្សាទុក" : "បន្ថែម"}
                  </button>
                  {isEditingSkill && (
                    <button
                      type="button"
                      onClick={resetSkillForm}
                      className="bg-slate-700 px-5 py-2 rounded-lg"
                    >
                      បោះបង់
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
              {loadingSkills ? (
                <div className="p-8 text-center text-gray-400">កំពុងដើរ...</div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-800 text-slate-300 border-b border-slate-700">
                      <th className="p-4 w-20">Icon</th>
                      <th className="p-4">ឈ្មោះជំនាញ</th>
                      <th className="p-4">កម្រិត</th>
                      <th className="p-4 text-center">សកម្មភាព</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {skills.map((s, i) => (
                      <tr
                        key={getIdProperty(s) || i}
                        className="hover:bg-slate-800/50"
                      >
                        <td className="p-4 text-xl">{s.icon}</td>
                        <td className="p-4 font-medium">{s.name}</td>
                        <td className="p-4 text-cyan-400">{s.level}</td>
                        <td className="p-4 text-center space-x-4">
                          <button
                            onClick={() => handleSkillEditClick(s)}
                            className="text-yellow-500 hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleSkillDelete(s)}
                            className="text-red-500 hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* ======================= TAB 3: EXPERIENCES ======================= */}
        {activeTab === "experiences" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">
              💼 គ្រប់គ្រងបទពិសោធន៍ការងារ (Experiences Management)
            </h1>
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 mb-8 max-w-2xl">
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">
                {isEditingExp
                  ? "📝 កែប្រែបទពិសោធន៍ការងារ"
                  : "➕ បន្ថែមបទពិសោធន៍ថ្មី"}
              </h3>
              <form onSubmit={handleExpSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    តួនាទី (Role / Position)
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="ឧទាហរណ៍៖ Frontend Developer"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    ឈ្មោះក្រុមហ៊ុន (Company)
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="ឧទាហរណ៍៖ ABA Bank"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    រយៈពេលបម្រើការងារ (Duration)
                  </label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="ឧទាហរណ៍៖ 2024 - Present"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    ការពិពណ៌នាការងារ (Job Description)
                  </label>
                  <textarea
                    rows="3"
                    value={expDescription}
                    onChange={(e) => setExpDescription(e.target.value)}
                    placeholder="រៀបរាប់ពីការងារ..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                  ></textarea>
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-semibold px-5 py-2 rounded-lg transition"
                  >
                    {isEditingExp ? "រក្សាទុកការកែប្រែ" : "បន្ថែមបទពិសោធន៍"}
                  </button>
                  {isEditingExp && (
                    <button
                      type="button"
                      onClick={resetExpForm}
                      className="bg-slate-700 text-white px-5 py-2 rounded-lg"
                    >
                      បោះបង់
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
              {loadingExperiences ? (
                <div className="p-8 text-center text-gray-400">
                  កំពុងទាញទិន្នន័យ...
                </div>
              ) : experiences.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  មិនទាន់មានទិន្នន័យឡើយ។
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-800 text-slate-300 text-sm border-b border-slate-700">
                      <th className="p-4">តួនាទី</th>
                      <th className="p-4">ក្រុមហ៊ុន</th>
                      <th className="p-4">រយៈពេល</th>
                      <th className="p-4 text-center">សកម្មភាព</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-sm">
                    {experiences.map((exp, index) => (
                      <tr
                        key={getIdProperty(exp) || index}
                        className="hover:bg-slate-800/50"
                      >
                        <td className="p-4 font-medium text-white">
                          {exp.role}
                        </td>
                        <td className="p-4 text-cyan-400">{exp.company}</td>
                        <td className="p-4 text-gray-400">{exp.duration}</td>
                        <td className="p-4 text-center space-x-4">
                          <button
                            onClick={() => handleExpEditClick(exp)}
                            className="text-yellow-500 hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleExpDelete(exp)}
                            className="text-red-500 hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
