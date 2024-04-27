from playwright.sync_api import Locator, Page
from urllib.parse import urlparse

class CVEdetails:

    def __init__(self, page:Page) -> None:
        self.page = page
        self.base_url = "https://www.cvedetails.com"
    

    def getMicroVersions(self, product: str, version: str, page_number:int=1):
        url: str = "https://www.cvedetails.com/version-search.php?vendor=&product={product}&version={version}&page={page_number}".format(
            product=product, version=version, page_number=page_number
        )
        self.page.goto(url)
        if "/vulnerability-list/" in self.page.url:
            detials = self.page.locator("main > span").first.inner_text().split(":")
            return [
                {
                    "index": 1,
                    "vendor": detials[3],
                    "product": detials[4],
                    "version": detials[5],
                    "numberOfVulnerabilities": -1,
                    "url": urlparse(self.page.url).path,
                }
            ]
        versions = []
        table = self.page.locator("table.table-striped tbody tr")
        for row in table.all():
            versions.append(self.parseTableRow(row))

        has_nextPage = self.page.locator("[title='Next page']").count() == 1
        if has_nextPage:
            next_page_number = page_number + 1
            nextPage_versions = self.getMicroVersions(product, version, next_page_number)
            if nextPage_versions != None:
                versions += nextPage_versions

        return versions
    
    def parseTableRow(self,row: Locator):
        data = row.locator("td")
        index = data.nth(0).inner_text()
        vendor = data.nth(1).inner_text()
        product = data.nth(2).inner_text()
        version = data.nth(3).inner_text()
        numberOfVulnerabilities = data.nth(6).inner_text()
        url = data.nth(6).locator("a").get_attribute("href")
        return {
            "index": index,
            "vendor": vendor,
            "product": product,
            "version": version,
            "numberOfVulnerabilities": numberOfVulnerabilities,
            "url": url,
        }
    
    def getCvesPages(self,version: str, page_number: int=1) -> list[str]:
        # TODO: support cves pagination
        urls = []
        self.page.goto(self.base_url + version["url"])
        elements = self.page.locator("#searchresults a").all()
        for element in elements:
            urls.append(element.get_attribute("href"))
        return urls
    
    def getCveDetails(self,cve_url: str):
        self.page.goto(self.base_url + cve_url)
        title = self.page.locator("#cvedetails-title-div a").all()[0].inner_text()
        description = self.page.locator("#cvedetailssummary").all()[0].inner_text()
        score = self.page.locator(".cvssbox").all()[0].inner_text()
        return {"cve": title, "description": description, "score": score}
    
    def getVulnerabilities(self, product: str, version: str):
        try:
            micro_versions = self.getMicroVersions(product, version)
            cves_pages = []
            for micro_version in micro_versions:
                cves_pages.extend(self.getCvesPages(micro_version))
            # remove douplicate values
            cves_pages = list(set(cves_pages))

            cves = []
            for cve_page in cves_pages:
                cves.append(self.getCveDetails(cve_page))
            return cves
        except:
            pass
