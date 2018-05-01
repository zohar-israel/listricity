<%@ WebHandler Language="C#" Class="main" %>

using System;
using System.Web;
using System.Text.RegularExpressions;

public class main : IHttpHandler
{
    public static string html = "";
    public void ProcessRequest(HttpContext context)
    {
        string json = "";
        string content = "";
        init();
        string OriginalUrl = context.Request.QueryString["aspxerrorpath"] ?? context.Request.RawUrl;
        if (OriginalUrl.Contains("/jobs/")) {
            context.Response.Write("Pending ...");
            context.Response.End();
            return;
        }
        string title = OriginalUrl.Trim('/').Replace(" ","_").Replace("+","_");
        //title = "folk";
        if (!title.Contains("?") && System.IO.File.Exists(context.Server.MapPath("/pages/" + title + ".hdump")))
        {
            context.Server.ClearError();
            content = System.IO.File.ReadAllText(context.Server.MapPath("/pages/" + title + ".hdump"));
            content = content.Replace("shown=\"true\"", "shown=\"true\" a style=\"display:block;display:flex;\"").Replace("////", "//").Replace(".webp", ".jpg").Replace("_webp/", "/");
            content += new System.Net.WebClient().DownloadString("http://23.96.27.111/?q="+title.Replace("_"," ").Replace("+"," ")+" music&format=html&frameElements=[%27nostatsPreview%27,%27noheader%27,%27nomediaPreview%27,%27noshareLinks%27]&columnscount=2&tabs=[%27mentions%27]&noscript=true").Replace("width: 750px", "width:100%");
            content += new System.Net.WebClient().DownloadString("http://23.96.27.111/?q="+title.Replace("_"," ").Replace("+"," ")+" online music player&format=html&frameElements=[%27nostatsPreview%27,%27noheader%27,%27nomediaPreview%27,%27noshareLinks%27]&columnscount=2&tabs=[%27mentions%27]&noscript=true").Replace("width: 750px", "width:100%");
            content += new System.Net.WebClient().DownloadString("http://23.96.27.111/?q="+title.Replace("_"," ").Replace("+"," ")+" music player&format=html&frameElements=[%27nostatsPreview%27,%27noheader%27,%27nomediaPreview%27,%27noshareLinks%27]&columnscount=2&tabs=[%27mentions%27]&noscript=true").Replace("width: 750px", "width:100%");

            json = System.IO.File.ReadAllText(context.Server.MapPath("/pages/" + title + ".jdump"));
            json = json.Replace("\"ui\":true", "\"ui\":false");
            //json = new System.Text.RegularExpressions.Regex("(\"type\":\"up\"[^\\}]+\"ui\":)(true)", System.Text.RegularExpressions.RegexOptions.).Replace(json, "$1false");
            //json = System.Text.RegularExpressions.Regex.Replace(json, "(\"type\":\"up\"[^\\}]+\"ui\":)(true)", "$1false");
            //string strRegex = @"(""type""\:""up""[^\}]+""ui""\:)(true)";
            //Regex myRegex = new Regex(strRegex, RegexOptions.None);
            //string strTargetString = json;
            //string strReplace = @"$1false";

            //json = myRegex.Replace(strTargetString, strReplace);
            // strRegex = @"(""type""\:""list""[^\}]+""ui""\:)(true)";
            // myRegex = new Regex(strRegex, RegexOptions.None);
            // strTargetString = json;
            // strReplace = @"$1false";

            //json = myRegex.Replace(strTargetString, strReplace);

        }
        else if (false)
        {
            context.Server.ClearError();
            //content = "pop";
            string surl = "http://box.listricity.com/results?search_query=" + title;
            string res = new System.Net.WebClient().DownloadString(surl);
            //content = content.Split(new string[] { "class=\"item-section\">" }, StringSplitOptions.None)[1]
            //      .Split(new string[] { "</ol>\r\n</li>" }, StringSplitOptions.None)[0];
            string[] vids = res.Split(new string[] { "<li><div" }, StringSplitOptions.None);
            content = "";
            int ind = 0;
            foreach (string v in vids)
            {
                string j = "";
                string c = "";
                if (ind % 3 == 0 && !content.EndsWith("flex;\">")) content += "<div class=\"suglist\" shown=\"true\" style=\"display:flex;\">";
                if (ind > 0)
                {
                    c = uivid(v, out j);
                    if (!j.StartsWith("err:"))
                    {
                        content += c;
                        json += "," + j;
                    }
                }
                if ((ind % 3 == 2 && !content.EndsWith("flex;\">")) || ind == vids.Length - 1) content += "</div>";

                //if (!j.StartsWith("err:"))
                ind++;
            }
            json = "[" + json.TrimStart(',') + "]";
        }
        else if (title.Contains("?")) {
            json = "[]";
            string llhtml = html.Replace("<!--stage-->", content + "\r\n" + json);
            llhtml = llhtml.Replace( "var statichtml = true;","var statichtml = false;");
            llhtml = rxreplace(@"<title>[^<]+</title>", llhtml, "<title>Online " + title.Replace("_", " ") + " music player</title>");
            context.Response.Write(llhtml);
            return;
        }
        else {
            content = "<div style=\"font-size: 34px;background-image: url(404.png);height: 100%;background-position: center;background-repeat: no-repeat;color: silver;font-weight: 100;text-shadow: -1px -1px 11px rgba(0,0,0,5),0px 0px 2px rgba(200,200,200,.9),1px 1px 2px rgba(0,0,0,.1);margin-top: -1px;text-align: center;\">This page was not found (404)</div>";
            json = "[];";
        }
        json = "\r\n<script>;\r\nallvids=" + json + ";//zzz</script>";
        string lhtml = html.Replace("<!--stage-->", content + "\r\n" + json);
        lhtml = rxreplace(@"<title>[^<]+</title>", lhtml, "<title>Online " + title.Replace("_", " ") + " music player</title>");
        context.Response.Write(lhtml);
    }
    string rxreplace(string strRegex,string strTargetString,string strReplace) {
        Regex myRegex = new Regex(strRegex, RegexOptions.None);
        return myRegex.Replace(strTargetString, strReplace);
    }
    void init()
    {
        //if (html != "") return;
        html = System.IO.File.ReadAllText(HttpContext.Current.Server.MapPath("/default.aspx"));
        html = html.Replace("var statichtml = false;", "var statichtml = true;");
        html = Regex.Replace(html, "<%.+?%>", "");
    }
    string uivid(string v, out string j)
    {
        try
        {
            string t = "sug";
            string vlink = "/watch?v=" + v.Split(new string[] { "<a href=\"/watch?v=" }, StringSplitOptions.None)[1].Split('"')[0];
            string vdur = v.Split(new string[] { "video-time" }, StringSplitOptions.None)[1].Split('>')[1].Split('<')[0];
            string vtitle = v.Split(new string[] { "<a href=\"/watch?v=" }, StringSplitOptions.None)[1].Split(new string[] { "title=\"" }, StringSplitOptions.None)[1].Split('"')[0];
            string vid = "" + new Random().Next(9999999);
            string vimg = v.Split(new string[] { "src=\"" }, StringSplitOptions.None)[1].Split('"')[0];
            if (vimg.Contains("pixel")) vimg = v.Split(new string[] { "data-thumb=\"" }, StringSplitOptions.None)[1].Split('"')[0];
            j = "{\"link\":\"" + vlink + "\",";
            j += "\"dur\":\"" + vdur + "\",";
            j += "\"title\":\"" + vtitle + "\",";
            j += "\"ui\":true,";
            j += "\"type\":\"sug\",";
            j += "\"id\":\"" + vid + "\",";
            j += "\"img\":\"" + vimg + "\"}";

            var h = "<div data-link=\"" + vlink + "\" style=\"" + (false ? "opacity:.73;    -webkit-filter: grayscale(1);    background: none;" : "") + ";min-width:" + Math.Min(350, 256 + (vtitle.Length - 50) * 2 + 25) + "px;    white-space: nowrap;background-image: linear-gradient(to bottom left, rgb(234, 234, 234), #8E8E8E);\" valign=\"top\" class=\"vidui popin\" id=\"" + vid + "\" onclick=\"clicked(" + vid + ",'" + t + "',this,'main')\">";
            h += "<table style=\"width: 100%;\" cellspacing=\"0\" cellpadding=\"0\"><tr><td width=\"10\"><img class=\"vidimgui\" src=\"https://" + vimg.Replace("https://", "") + "\"> ";
            h += "</td><td ><div class=\"title\" >" + vtitle + "</div></td></tr></table>";
            h += "<span class=\"vidtimeui\" >" + vdur + "</span> ";
            h += "<div class=\"tools\">";
            h += "<span class=\"toolph\"\"></span>";
            h += "<span class=\"delall tool\" title=\"delete this and all next videos\" onclick=\"deleteAllVid(" + vid + ");return false;\"></span>";
            h += "<span class=\"del tool\" title=\"delete this video\" onclick=\"deleteVid(" + vid + ");return false;\"></span>";
            //h += "<span class=\"delwiz tool\" title=\"delete anything like this video\" onclick=\"deleteVid(" + vid + ",true);return false;\"></span>"
            h += "<span class=\"addwiz tool\"  title=\"add this video and more videos like it\" onclick=\"clicked(" + vid + ",\"" + t + "\",this.parentNode.parentNode,\"addwiz\");return false;\"></span>";
            h += "<span class=\"addtop tool\" title=\"play this video next\" onclick=\"addTop(" + vid + ",\"" + t + "\",this.parentNode.parentNode);return false;\"></span>";
            h += "<span class=\"addbottom tool\" title=\"add this video last\" onclick=\"addBottom(" + vid + ",\"" + t + "\",this.parentNode.parentNode);return false;\"></span>";
            //h += "<span class=\"playnext tool\" title=\"play this next\" onclick=\"addTop(" + vid + ",\"" + t + "\",this.parentNode.parentNode);return false;\"></span>"
            //h += "<span class=\"skipto tool\" title=\"skip to this\" onclick=\"clicked(" + vid + ",\"" + t + "\",this.parentNode.parentNode);return false;\"></span>"
            h += "</div></div>";
            return h;
        }
        catch (Exception e)
        {
            j = "err:";
            return "err:" + e.Message;
        }
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}