import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Assets } from "./assets";

@Injectable({
  providedIn: "root"
})
export class AssetsService { 
  private baseUrl = "/api/v1/assets";
  assets = new Assets();

  constructor(private http: HttpClient) {}

  getAssets(assetsId: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${assetsId}`);
  }

  createAssets(assets: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, assets);
  }

  //  updateassets(assetsId: number): Observable<Object> {
  //    return this.http.put(`${this.baseUrl}/${assetsId}`, assetsId);
  
   
  // }

  updateAssets(assets: Assets, assetsId){
    return this.http.put(`${this.baseUrl}/${assetsId}`, assets);
  }


  deleteAssets(assetsId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${assetsId}`, {
      responseType: "text"
    });
  }

  getAssetsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}

//updateassets(assetsId: number, value: any): Observable<Object> {
//   return this.http.put(`${this.baseUrl}/${assetsId}`, value);
// }