import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button, Select, MenuItem, FormControl, InputLabel, styled } from "@mui/material";
import { School as StudentIcon, Person as TeacherIcon, AdminPanelSettings as AdminIcon, ArrowRightAlt } from "@mui/icons-material";
import { useAuth } from "../../context/context";
import BannerIllustration from "../../assets/Banner.svg";

const StyledSelect = styled(Select)(({ theme }) => ({
  borderRadius: "12px",
  backgroundColor: theme.palette.background.paper,
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(0, 0, 0, 0.12)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderWidth: "2px",
    borderColor: theme.palette.primary.main,
  },
}));

const roleOptions = [
  { value: "student", label: "Student", icon: <StudentIcon className="text-primary-600" /> },
  { value: "teacher", label: "Teacher", icon: <TeacherIcon className="text-primary-600" /> },
  { value: "admin", label: "Admin", icon: <AdminIcon className="text-primary-600" /> },
];

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.3 } },
};

function Banner() {
  const navigate = useNavigate();
  const {user, isLoggedIn } = useAuth();
  const [role, setRole] = useState("");

  useEffect(() => {
    if (isLoggedIn && user?.role) {
    console.log("User role:",user.role);
          redirectUser(user.role);
    }
  }, [isLoggedIn,user]);

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const redirectUser = (role) => {
    if (role === "teacher" || role === "admin") {
      window.location.href = "https://e-learning-plateform-admin.vercel.app/";
    } else {
      navigate("/"); // Redirect logged-in students to the dashboard
    }
  };

  const handleGetStarted = () => {
    if (isLoggedIn) {
      redirectUser(user.role);
    } else {
      if (role === "teacher" || role === "admin") {
        window.location.href = "https://e-learning-plateform-admin.vercel.app/";
      } else {
        navigate("/login");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 p-6">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="flex flex-col justify-center max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 text-gray-900 dark:text-white">
            Elevate Your <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">Learning Experience</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-600 dark:text-gray-300 leading-relaxed">
            Join thousands of students discovering new skills with our interactive courses designed for modern learners.
          </p>
          {!isLoggedIn && (
            <FormControl fullWidth className="mb-8">
              <InputLabel id="role-select-label" className="text-gray-800 dark:text-gray-500 ">I am a...</InputLabel>
              <StyledSelect
                labelId="role-select-label"
                value={role}
                onChange={handleRoleChange}
                className="text-gray-900 dark:text-white"
              >
                {roleOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value} className="flex items-center gap-3 dark:hover:bg-gray-700 ">
                    <span className="text-gray-800 px-2  dark:text-gray-800">{option.icon}</span>
                    <span className="text-gray-800 px-2  dark:text-gray-800">{option.label}</span>
                  </MenuItem>
                ))}
              </StyledSelect>
            </FormControl>
          )}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="self-start mt-6">
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowRightAlt />}
              onClick={handleGetStarted}
              disabled={!role && !isLoggedIn}
              className={`py-3 px-6 rounded-xl text-white bg-gradient-to-r from-pink-500 to-rose-500 shadow-lg hover:shadow-xl transition-all ${
                !role && !isLoggedIn ? "opacity-70" : ""
              }`}
              sx={{ textTransform: "none", fontSize: "1rem", fontWeight: 600 }}
            >
              {isLoggedIn ? "Go to Dashboard" : "Start Learning Now"}
            </Button>
          </motion.div>
        </motion.div>
        <motion.div initial="hidden" animate="visible" variants={scaleUp} className="flex justify-center items-center">
          <img src={BannerIllustration} alt="Learning illustration" className="w-full max-w-xl h-auto max-h-[70vh] object-contain rounded-lg shadow-2xl transform -rotate-2" />
        </motion.div>
      </div>
    </div>
  );
}

export default Banner;
