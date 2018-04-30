<%@ WebHandler Language="C#" Class="record" %>

using System;
using System.Web;
using System.Data;
using System.Data.SqlClient;
public class record : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {

        if (context.Request["act"] == "Saved Mood pub" && !string.IsNullOrEmpty( context.Request["vids"])) {
            string n = context.Request["data"].Substring(0).Replace(" ","_");
            string v = context.Request["vids"];
            System.IO.File.WriteAllText(context.Server.MapPath("/moods/") + n + ".js", v);
            return;
        }
        DataTable tbl = ExecuteSQL("select * from listeners where user_guid='" + context.Request["guid"].Replace("'", "''") + "'");
        if (tbl.Rows.Count == 0) {
            tbl = ExecuteSQL("insert into listeners(user_guid) values('" + context.Request["guid"].Replace("'", "''") + "')");
            tbl = ExecuteSQL("select * from listeners where user_guid='" + context.Request["guid"].Replace("'", "''") + "'");
        }
        string uid = tbl.Rows[0]["id"].ToString();
        ExecuteSQL("insert into actions(listenerid,act,data) values(" + uid + ",'" + context.Request["act"].Replace("'", "''") + "','" + context.Request["data"].Replace("'", "''") + "')");

        if (context.Request["act"] == "Download List" && !string.IsNullOrEmpty(context.Request["vids"]))
        {
            string n = context.Request["data"].Substring(1).Replace(" ","_");
            string v = context.Request["vids"];
            string m = context.Request["mail"];
            string g = context.Request["guid"];

            System.IO.File.WriteAllText(context.Server.MapPath("/jobs/" + g + ".txt"), n + "\n" + m + "\n" + v);
            System.IO.File.WriteAllText(context.Server.MapPath("/jobs/" + g + "_res.htm"), "Playlist download recieved");
        }
        if (context.Request["act"] == "Saved List pub" && !string.IsNullOrEmpty( context.Request["vids"])) {
            string n = context.Request["data"].Substring(1).Replace(" ","_");
            string v = context.Request["vids"];
            string h = context.Request["html"];
            System.IO.File.WriteAllText(context.Server.MapPath("/pages/") + n + ".jdump", v);
            System.IO.File.WriteAllText(context.Server.MapPath("/pages/") + n + ".hdump", h);
            string[] fs=System.IO.Directory.GetFiles(context.Server.MapPath("/pages/"), "*.hdump");
            string mnu = "";
            foreach (string f in fs) {
                string[] ts=f.Replace("_", " ").Replace(".hdump", "").Split('\\');
                string t = ts[ts.Length - 1];
                mnu += "<div class=\"mnuitem\">" + t + "</div>";
            }
            mnu = "<div id=\"mnu\" class=\"suglist\">" + mnu + "</div>";
            string html = System.IO.File.ReadAllText(HttpContext.Current.Server.MapPath("/index.html"));
            string lhtml = html.Replace("<!--stage-->", mnu + "\r\n" + "<!--stage-->");

            System.IO.File.WriteAllText(context.Server.MapPath("/mnu.html"), lhtml);
        }

        // return empty gif
        context.Response.ContentType = "image/gif";
        context.Response.Write("R0lGODlhAQABAID/AP///wAAACwAAAAAAQABAAACAkQBADs=");
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }
    public DataTable ExecuteSQL(string sql)
    {
        string cnn =
              "uid=sa;"
            + "pwd=r2d2c3po;"
            + "server=INSTANCE-1\\SQLEXPRESS;"
            + "database=listricity; "
            + "timeout=30;"
            + "Max Pool Size=500;";

        DataTable dt = new DataTable();
        using (SqlConnection con = new SqlConnection(cnn))
        {
            using (SqlCommand cmd = new SqlCommand(sql, con))
            {
                con.Open();
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
            }
        }
        return dt;
    }

}
