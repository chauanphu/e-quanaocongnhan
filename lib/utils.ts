import Page from "interfaces/page"
import data from "../data/data.json"

export function getPages(): Page[] {
   return data['main-nav']
}
export function getContact(): {
   address: string;
   email: string;
   phone: string;
} {
   return data['contact']

}
/**
* A function returns true if the page is active
* It will match all the subpages of the page
* @param activeLink 
* @param pageLink 
* @returns 
*/
export const isPageActive = (activeLink: string, pageLink: string) => {
   if (pageLink === '/') return activeLink === pageLink
   if (pageLink === '/admin') return activeLink === pageLink
   if (activeLink.match(pageLink + '*')) return true
   // console.log(activeLink, pageLink)
   return false
}

export const getAdminPages = () => {
   return data['admin-nav']
}