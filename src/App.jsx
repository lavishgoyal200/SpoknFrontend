import { lazy, Suspense } from "react"
import { Navigate, Route, Routes } from "react-router"

const HomePage = lazy(() => import("./Pages/HomePage.jsx"))
const SignUpPage = lazy(() => import("./Pages/SignUpPage.jsx"))
const LoginPage = lazy(() => import("./Pages/LoginPage.jsx"))
const NotificationPage = lazy(() => import("./Pages/NotificationPage.jsx"))
const CallPage = lazy(() => import("./Pages/CallPage.jsx"))
const ChatPage = lazy(() => import("./Pages/ChatPage.jsx"))
const OnboardingPage = lazy(() => import("./Pages/OnboardingPage.jsx"))

import { Toaster } from "react-hot-toast"

import PageLoader from "./components/PageLoader.jsx"
import useAuthUser from "./hooks/useAuthUser.js"
import Layout from "./components/Layout.jsx"
import { useThemeStore } from "./store/useThemeStore.js"
const AiPage = lazy(() => import("./Pages/AiPage.jsx"))
const FriendsPage = lazy(() => import("./Pages/FriendsPage.jsx"))
const LandingPage = lazy(() => import("./Pages/LandingPage.jsx"))

const App = () => {
const {isLoading,authUser} = useAuthUser();
const {theme} = useThemeStore();

const isAuthenticated = Boolean(authUser)
const isOnboarded = authUser?.isOnboarded


  if (isLoading) return <PageLoader/>

  return (
    
      <div data-theme={theme}>
         <Suspense fallback={<PageLoader />}>
      <Routes>
      <Route path="/" element={!isAuthenticated && !isOnboarded ? (
         <Layout showSidebar={false}>
           <LandingPage/>
         </Layout>
        ) : (
          <Navigate to={"/home"} />
        )} />

        <Route path="/home" element={isAuthenticated && isOnboarded ? (
         <Layout showSidebar={true}>
           <HomePage/>
         </Layout>
        ) : (
          <Navigate to={!isAuthenticated ? "/" : "/onboarding"} />
        )} />

        <Route path="/signup" element={!isAuthenticated ? <SignUpPage /> : <Navigate to={isOnboarded ? "/": "/onboarding"} />} />

        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? "/": "/onboarding"} />} />

        <Route path="/chat/:id" element={isAuthenticated && isOnboarded ? (
          <Layout showSidebar={false}>
            <ChatPage />
          </Layout>
        ) : (
          <Navigate to={!isAuthenticated ? "/" : "/onboarding"}/>
        ) } />
        
        <Route path="/call/:id" element={isAuthenticated && isOnboarded ? (<CallPage />) : (<Navigate to={!isAuthenticated ? "/" : "/onboardimg"} />) } />

        <Route path="/notifications" element={isAuthenticated && isOnboarded ? (
          <Layout showSidebar={true}>
            <NotificationPage/>
          </Layout>
        ): (<Navigate to={!isAuthenticated ? "/": "/onboarding"} />)} />

        <Route path="/onboarding" element={isAuthenticated ? (!isOnboarded ? ( <OnboardingPage/> ):( <Navigate to="/" /> ) ) : ( <Navigate to="/login"/> )} />

         <Route path="/ai" element={isAuthenticated && isOnboarded ? (
         <Layout showSidebar={true}>
           <AiPage/>
         </Layout>
        ) : (
          <Navigate to={!isAuthenticated ? "/" : "/onboarding"} />
        )} />

        <Route path="/friends" element={isAuthenticated && isOnboarded ? (
         <Layout showSidebar={true}>
           <FriendsPage/>
         </Layout>
        ) : (
          <Navigate to={!isAuthenticated ? "/" : "/onboarding"} />
        )} />

      </Routes>
      </Suspense>
      <Toaster/>
      </div>
    
  )
}

export default App
