import React from "react";
import { motion } from "framer-motion";
import { Grid, Card, CardContent, Typography, Box, TextField, Button } from "@mui/material";
import { FiSend } from "react-icons/fi";

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const Subscribe = () => {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="py-20 px-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300"
    >
      {/* Title Section */}
      <motion.div initial="hidden" animate="visible" variants={fadeIn} className="text-center max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
          Subscribe to <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Our Newsletter
          </span>
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Stay updated with the latest courses, news, and special offers.
        </p>
      </motion.div>

      {/* Subscribe Card */}
      <Grid container justifyContent="center" sx={{ mt: 6 }}>
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.3 }}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                p: 4,
                borderRadius: 4,
                bgcolor: "white",
                boxShadow: 4,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 8,
                },
              }}
              className="dark:bg-gray-800 dark:text-white"
            >
              <CardContent>
                <Typography variant="h6" fontWeight={600} color="text.primary" className="dark:text-white mb-4">
                  📩 Join 50,000+ Learners
                </Typography>
                <Box
                  component="form"
                  className="flex flex-col md:flex-row justify-center items-center gap-4 w-full"
                >
                  <TextField
                    fullWidth
                    label="Enter your email"
                    variant="outlined"
                    className="bg-white rounded-lg"
                    sx={{
                      maxWidth: "400px",
                      "& .MuiInputBase-root": { borderRadius: "8px" },
                    }}
                  />
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<FiSend />}
                    className="px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 transition-all duration-300"
                  >
                    Subscribe
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </motion.section>
  );
};

export default Subscribe;
