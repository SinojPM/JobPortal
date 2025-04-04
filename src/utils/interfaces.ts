import { JSX } from "react";


export type userType = "jobSeeker" | "employer"
export interface userTypeState {
    userType: "jobSeeker" | "employer";
    isNewUser: boolean;
    userDetails: registerDetails
    registerResponse: {
        isPending: boolean;
        response: registerDetails[] | []
    };
    loginDetails: loginDetails;
    loginResponse: {
        isPending: boolean,
        response: registerDetails[] | [],
    };
    auth: {
        isAuthenticated: boolean;
        userType: userType;
        userDetails: userDetails;
    }
}
export interface userDetails {
    username: string;
    email: string;
    password: string;
    userType: userType;
    id: string;
}
export interface registerDetails {
    username: string;
    email: string;
    password: string;
    userType: userType
}
export interface loginDetails {
    email: string;
    password: string;
    userType: userType
}

export interface routeDetails {
    path: string;
    component: JSX.Element;
    allowedUsers: allowedUsers
}
export type allowedUsers = userType | "public" | "all";

export interface AllallowedUsers {
    jobSeeker: "jobSeeker";
    employer: "employer";
    public: "public";
    all: "all";
}

export interface JobFilter {
    filterType: filterType;
    filterValue: string;
}
export interface JobFilters {
    employmentType: string[];
    jobCategory: string[];
    jobLevel: string[];
    salaryRange: string[];
    industry: string[];
    companySize: string[];
  }
export type filterType = "Employment Type" | "Job Category" | "Job Level" | "Salary Range" | "Industry" | "Company Size";

export interface filterTypeProps {
    EmploymentType: filterType;
    JobCategory: filterType;
    JobLevel: filterType;
    SalaryRange: filterType;
    Industry:filterType
    CompanySize:filterType
}

export interface JobDetails {
    jobTitle: string;
    companyName: string;
    Location: string;
    jobType: string;
    mode: string;
    description: string;
    responsibilities: string[];
    whoYouAre: string[];
    NiceToHaves: string[];
    perks: string[];
    totalApplicants: number;
    applyBefore: number;
    postedOn: number;
    salary: string;
    skillsRequired: string[];
    category:string
    profileImg: string;
    id: string;
    jobLevel:string;
}

export interface jobState {
    apiResponse: {
        isPending: boolean;
        alljobs: [] | JobDetails[]
        dummyAlljobs: [] | JobDetails[]
    };
    locations:string[];
    pagination: {
        currentPage: number;
        displayedJobs: [] | JobDetails[]
    };
    filters: {
        EmploymentTypefilterArray: string[];
        JobCategoryfilterArray: string[];
        JobLevelfilterArray: string[];
    }
}

export interface searchValues {
    jobTitle: string;
    companyName:string;
    location: string;
    companyLocation:string;
}

export interface companyDetails {
    companyName:     string;
    logo:            string;
    founded:         Date;
    size:            string;
    location:        string;
    industry:        string;
    companyProfile:  string;
    techStack:       string[];
    twitter:         string;
    facebook:        string;
    officeLocations: string;
    linkedin:        string;
    image1:          string;
    image2:          string;
    image3:          string;
    image4:          string;
    benefits:        Benefit[];
    website:         string;
    email:           string;
    id:              string;
}

export interface Benefit {
    benefit:     string;
    logoTag:     string;
    description: string;
}

export interface companyState{
    apiResponse:{
        isPending:boolean;
        allCompanies:companyDetails[] | [];
        dummyAllCompanies:companyDetails[] | [];
    },
    locations:string[];
    pagination:{
        currentPage:number;
    },
    filters:{
        industryFilterArray:string [],
        companySizeFilterArray:string[],
   }
}

