import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';

import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Locations from './pages/Locations';
import Contact from './pages/Contact';

import Careers from './pages/Careers';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import ApplyJob from './pages/ApplyJob';
import PublicLayout from './components/PublicLayout';
import Dashboard from './pages/Dashboard';
import CourseView from './pages/CourseView';
import ModuleView from './pages/ModuleView';

import DashboardLayout from './components/DashboardLayout';
import Courses from './pages/Courses';
import Settings from './pages/Settings';
import Users from './pages/Users';
import AdminMessages from './pages/AdminMessages';
import AdminBlogs from './pages/AdminBlogs';
import AdminBlogEdit from './pages/AdminBlogEdit';
import SupportRequest from './pages/SupportRequest'; // For Staff/User
import SupportManagement from './pages/SupportManagement'; // For Admin
import Certifications from './pages/Certifications';
import CertificateView from './pages/CertificateView';
import PublicVerification from './pages/PublicVerification';
import Media from './pages/Media';
import Files from './pages/Files';
import Profile from './pages/Profile';
import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
          <Route path="/locations" element={<PublicLayout><Locations /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="/careers" element={<PublicLayout><Careers /></PublicLayout>} />
          <Route path="/careers/apply/:id" element={<PublicLayout><ApplyJob /></PublicLayout>} />
          <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
          <Route path="/blog/:id" element={<PublicLayout><BlogDetails /></PublicLayout>} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/courses"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Courses />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/course/:id"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <CourseView />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/course/:courseId/module/:moduleId"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ModuleView />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/users"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Users />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/settings"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Settings />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/messages"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AdminMessages />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/support"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <SupportRequest />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/blogs"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AdminBlogs />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/media"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Media />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/files"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Files />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/blogs/new"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AdminBlogEdit />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/blogs/edit/:id"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AdminBlogEdit />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin/support"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <SupportManagement />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/certificates"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Certifications />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/profile"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Profile />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route path="/certificates/:id" element={<CertificateView />} />
          <Route path="/verify" element={<PublicLayout><PublicVerification /></PublicLayout>} />
        </Routes>

        </AuthProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;
