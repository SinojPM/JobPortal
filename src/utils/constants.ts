import { AllallowedUsers, filterTypeProps, JobFilters } from "./interfaces"



export const passwordRegex:RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/

export const allowedUsers:AllallowedUsers = {
    jobSeeker:"jobSeeker",
    employer:"employer",
    public:"public",
    all:"all",
}


export const jobSeekerPages = [
    {page:"Find Jobs",pathname:"/job-seeker/find-jobs",icon:"fa-solid fa-magnifying-glass"},
    {page:"Browse Companies",pathname:"/job-seeker/browse-companies",icon:"fa-solid fa-building"},
    {page:"My Public Profile",pathname:"/job-seeker/profile",icon:"fa-solid fa-user"},
    {page:"My Applications",pathname:"/job-seeker/applications",icon:"fa-regular fa-newspaper"},
]



  export const jobFilter: JobFilters = {
    employmentType: [
      "Full-Time",
      "Part-Time",
      "Contract",
      "Internship",
      "Temporary",
      "Freelance",
      "Remote",
    ],
    jobCategory: [
      "Software Development",
      "UI/UX Design",
      "Marketing",
      "Sales",
      "Human Resources",
      "Customer Support",
      "Finance & Accounting",
      "Project Management",
      "Data Science",
      "Cybersecurity",
      "Cloud Computing",
    ],
    jobLevel: [
      "Entry-Level",
      "Mid-Level",
      "Senior-Level",
      "Lead",
      "Director",
      "VP",
      "C-Level (CEO, CTO, etc.)",
    ],
    salaryRange: [
      "Below 15K",
      "15K-35K",
      "35K-55K",
      "55K-95K",
      "95K-135K",
      "135K-175K",
      "175K-215K",
      "215K and above",
    ],
    industry: [
      "Information Technology",
      "Healthcare & Pharmaceuticals",
      "Financial Services",
      "Education & E-Learning",
      "Retail & E-Commerce",
      "Manufacturing & Engineering",
      "Real Estate & Construction",
      "Media & Entertainment",
      "Logistics & Transportation",
      "Energy & Utilities",
      "Hospitality & Tourism",
      "Telecommunications",
      "Automotive",
      "Agriculture & Food Processing",
      "Aerospace & Defense",
    ],
    companySize: [
      "1-10",
      "11-50",
      "51-200",
      "201-500",
      "501-1000",
      "1001-5000",
      "5001-10000",
      "10000+",
    ],
  };

 export const filterTypes:filterTypeProps = {
    EmploymentType: "Employment Type",
    JobCategory: "Job Category",
    JobLevel: "Job Level",
    SalaryRange: "Salary Range",
    Industry:"Industry",
    CompanySize:"Company Size"
  };

  export const jobsPerPage = 6
  export const companiesPerPage = 8
  