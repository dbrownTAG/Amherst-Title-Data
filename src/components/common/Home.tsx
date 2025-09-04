import React from "react";
import {
  Typography,
  Paper,
  Box,
  Divider,
  Link,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <Box>
      <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: 600, mb: 3, color: "#00487a" }}
        >
          Title Data v1.5.2
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{ color: "text.secondary", maxWidth: "800px", mb: 3 }}
        >
          Welcome to the documentation for the Amherst Title Data API. This API
          provides access to real estate transaction data including cash
          acquisitions, retail sales, and portfolio properties.
        </Typography>

        <Box sx={{ my: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 600, mb: 3, color: "#00487a" }}
          >
            Base URLs
          </Typography>
          <Box
            sx={{
              p: 3,
              backgroundColor: "#f5f2e8",
              borderRadius: 2,
              border: "1px solid #E2E8F0",
              mb: 2,
            }}
          >
            <Typography variant="body1" sx={{ fontFamily: "monospace", mb: 1 }}>
              <strong>QA:</strong> https://qa.amhev.com/api
            </Typography>
            <Typography variant="body1" sx={{ fontFamily: "monospace" }}>
              <strong>PROD:</strong> https://prod.amherstapi.com/api
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: 600, mb: 3, color: "#00487a" }}
        >
          Getting Started
        </Typography>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="body1"
            paragraph
            sx={{ color: "text.secondary" }}
          >
            To use the Amherst Title Data API, you'll need to:
          </Typography>
          <Box sx={{ pl: 2, borderLeft: "2px solid #E2E8F0" }}>
            <Typography variant="body1" sx={{ mb: 2, color: "text.secondary" }}>
              •{" "}
              <Link
                component={RouterLink}
                to="/authentication"
                sx={{ color: "secondary.main", fontWeight: 500 }}
              >
                Obtain an access token
              </Link>{" "}
              using your client credentials
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: "text.secondary" }}>
              • Include the token in all API requests in the Authorization
              header
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              • Make requests to the appropriate endpoints
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontWeight: 600, mb: 3, pl: 1 }}
      >
        API Resources
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 2,
              border: "1px solid #E2E8F0",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                borderColor: "secondary.main",
                transform: "translateY(-4px)",
                boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Authentication
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 2 }}
              >
                Learn how to authenticate with the API and manage your access
                tokens.
              </Typography>
              <Link
                component={RouterLink}
                to="/authentication"
                sx={{
                  color: "secondary.main",
                  fontWeight: 500,
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                View Authentication →
              </Link>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 2,
              border: "1px solid #E2E8F0",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                borderColor: "secondary.main",
                transform: "translateY(-4px)",
                boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Cash Acquisitions
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 2 }}
              >
                Access and manage cash acquisition transactions.
              </Typography>
              <Link
                component={RouterLink}
                to="/cash-acquisitions"
                sx={{
                  color: "secondary.main",
                  fontWeight: 500,
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                View Cash Acquisitions →
              </Link>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 2,
              border: "1px solid #E2E8F0",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                borderColor: "secondary.main",
                transform: "translateY(-4px)",
                boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Retail Sales
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 2 }}
              >
                Access and manage retail sale transactions.
              </Typography>
              <Link
                component={RouterLink}
                to="/retail-sales"
                sx={{
                  color: "secondary.main",
                  fontWeight: 500,
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                View Retail Sales →
              </Link>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 2,
              border: "1px solid #E2E8F0",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                borderColor: "secondary.main",
                transform: "translateY(-4px)",
                boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Bulk Portfolio
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 2 }}
              >
                Access portfolio property details with HOA information.
              </Typography>
              <Link
                component={RouterLink}
                to="/bulk-portfolio"
                sx={{
                  color: "secondary.main",
                  fontWeight: 500,
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                View Bulk Portfolio →
              </Link>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 2,
              border: "1px solid #E2E8F0",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                borderColor: "secondary.main",
                transform: "translateY(-4px)",
                boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Document Management
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 2 }}
              >
                Create, update, and retrieve documents for transactions.
              </Typography>
              <Link
                component={RouterLink}
                to="/document-management"
                sx={{
                  color: "secondary.main",
                  fontWeight: 500,
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                View Document Management →
              </Link>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 2,
              border: "1px solid #E2E8F0",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                borderColor: "secondary.main",
                transform: "translateY(-4px)",
                boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Version History
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 2 }}
              >
                View the changelog and updates to the API.
              </Typography>
              <Link
                component={RouterLink}
                to="/version-history"
                sx={{
                  color: "secondary.main",
                  fontWeight: 500,
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                View Version History →
              </Link>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
