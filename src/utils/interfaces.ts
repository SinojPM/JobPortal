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
    filterType: "Employment Type" | "Job Category" | "Job Level" | "Salary Range";
    filterValue: string;
}
export type filterType = "Employment Type" | "Job Category" | "Job Level" | "Salary Range";

export interface filterTypeProps {
    EmploymentType: filterType;
    JobCategory: filterType;
    JobLevel: filterType;
    SalaryRange: filterType;
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
