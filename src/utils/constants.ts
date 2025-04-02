import { AllallowedUsers, filterTypeProps } from "./interfaces"
import { JobFilter } from "./interfaces"


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


export const jobFilters:JobFilter[] = [
    { filterType: "Employment Type", filterValue: "Full-Time" },
    { filterType: "Employment Type", filterValue: "Part-Time" },
    { filterType: "Employment Type", filterValue: "Contract" },
    { filterType: "Employment Type", filterValue: "Internship" },
    { filterType: "Employment Type", filterValue: "Temporary" },
    { filterType: "Employment Type", filterValue: "Freelance" },
    { filterType: "Employment Type", filterValue: "Remote" },
  
    // Job Categories
    { filterType: "Job Category", filterValue: "Software Development" },
    { filterType: "Job Category", filterValue: "UI/UX Design" },
    { filterType: "Job Category", filterValue: "Marketing" },
    { filterType: "Job Category", filterValue: "Sales" },
    { filterType: "Job Category", filterValue: "Human Resources" },
    { filterType: "Job Category", filterValue: "Customer Support" },
    { filterType: "Job Category", filterValue: "Finance & Accounting" },
    { filterType: "Job Category", filterValue: "Project Management" },
    { filterType: "Job Category", filterValue: "Data Science" },
    { filterType: "Job Category", filterValue: "Cybersecurity" },
    { filterType: "Job Category", filterValue: "Cloud Computing" },
  
    // Job Levels
    { filterType: "Job Level", filterValue: "Entry-Level" },
    { filterType: "Job Level", filterValue: "Mid-Level" },
    { filterType: "Job Level", filterValue: "Senior-Level" },
    { filterType: "Job Level", filterValue: "Lead" },
    { filterType: "Job Level", filterValue: "Director" },
    { filterType: "Job Level", filterValue: "VP" },
    { filterType: "Job Level", filterValue: "C-Level (CEO, CTO, etc.)" },
  
    // Salary Ranges
    { filterType: "Salary Range", filterValue: "Below 15K" },
    { filterType: "Salary Range", filterValue: "15K-35K" },
    { filterType: "Salary Range", filterValue: "35K-55K" },
    { filterType: "Salary Range", filterValue: "55K-95K" },
    { filterType: "Salary Range", filterValue: "95K-135K" },
    { filterType: "Salary Range", filterValue: "135K-175K" },
    { filterType: "Salary Range", filterValue: "175K-215K" },
    { filterType: "Salary Range", filterValue: "215K and above" }
  ];

 export const filterTypes:filterTypeProps = {
    EmploymentType: "Employment Type",
    JobCategory: "Job Category",
    JobLevel: "Job Level",
    SalaryRange: "Salary Range"
  };
  