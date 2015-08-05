using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;
using System.IO;
using System.Runtime.InteropServices; 

namespace JDF_UI.UC
{
    public partial class UC_FolderTree : UserControl
    {
        public UC_FolderTree()
        {
            InitializeComponent();
           
            treeViewDirectory.BeginUpdate();
            treeViewDirectory.ImageList = imageList1;
            treeViewDirectory.SelectedImageIndex = 0;
            treeViewDirectory.ImageIndex = 0;
            EnumDrivers();
            treeViewDirectory.EndUpdate();
            

        }
        public static string folderTitle = "";
   

        private void EnumDrivers()
        {

            TreeNode rootNode = new TreeNode();
            rootNode.Text = "我的电脑";
            rootNode.ImageIndex = 0;

            rootNode.Expand();
            treeViewDirectory.Nodes.Add(rootNode);
            treeViewDirectory.SelectedNode = rootNode.FirstNode;

            DriveInfo[] allDrives = DriveInfo.GetDrives();
            int j = 0;
            try
            {
                int i = 0;
                foreach (DriveInfo d in allDrives)
                {
                    if (d.DriveType.ToString() == "Fixed")
                    {
                        TreeNode tn = new TreeNode(d.Name);



                        tn.ImageIndex = 1;
                        tn.SelectedImageIndex = 3;
                        i++;
                        tn.Tag = d.RootDirectory.FullName;
                        treeViewDirectory.Nodes[0].Nodes.Add(tn);

                        treeViewDirectory.Nodes[0].Nodes[j].Text = d.Name + "(本地硬盘," + d.TotalFreeSpace / 1024 / 1024 / 1024 + "G/" + d.TotalSize / 1024 / 1024 / 1024 + "G)";


                        ShowDirs(tn);
                        j++;
                    }
                }
            }
            catch (System.Exception)
            {
            }
        }

        private void ShowDirs(TreeNode tn)
        {
            tn.Nodes.Clear();
            try
            {
                DirectoryInfo DirInfo = new DirectoryInfo(tn.Tag.ToString());
                if (!DirInfo.Exists)
                {
                    return;
                }
                else
                {
                    DirectoryInfo[] Dirs;
                    FileInfo[] Fis;
                    try
                    {
                        Dirs = DirInfo.GetDirectories();
                        Fis = DirInfo.GetFiles("*.*", SearchOption.TopDirectoryOnly);
                    }
                    catch (Exception e)
                    {
                        return;
                    }
                    foreach (DirectoryInfo Dir in Dirs)
                    {
                        TreeNode dir = new TreeNode(Dir.Name);
                        dir.SelectedImageIndex = 3;
                        dir.ImageIndex = 1;
                        dir.Tag = Dir.FullName;
                        tn.Nodes.Add(dir);
                    }

                    foreach (FileInfo fi in Fis)
                    {
                        TreeNode dir = new TreeNode(fi.Name);
                        dir.SelectedImageIndex = 3;
                        dir.ImageIndex = 2;
                        dir.Tag = fi.FullName;
                        tn.Nodes.Add(dir);
                    }



                }
            }
            catch (System.Exception)
            { }
        }

        private void treeViewDirectory_BeforeExpand(object sender, TreeViewCancelEventArgs e)
        {
           
        }

 

        private void treeViewDirectory_NodeMouseClick(object sender, TreeNodeMouseClickEventArgs e)
        {
            Form1 f1 = (Form1)this.Parent.Parent.Parent;
            if (e.Node.Tag != null)
            {
                var pathName = e.Node.Tag.ToString();
                f1.setCurrentPath(pathName);

 

            }
            

        }

  

        private void treeViewDirectory_NodeMouseDoubleClick(object sender, TreeNodeMouseClickEventArgs e)
        {
            Form1 f1 = (Form1)this.Parent.Parent.Parent;
            if (e.Node.Tag != null)
            {
                var pathName = e.Node.Tag.ToString();
                f1.setCurrentPath(pathName);

                if (File.Exists(pathName))
                {
                    f1.showFile(pathName);
                    f1.showEditorView();
                    f1.uC_TitleLogo1.adjustSwitchBtn();
                }
                 

            }
        }

        private void treeViewDirectory_MouseLeave(object sender, EventArgs e)
        {
 
            Common.form1.uC_Editor1.setWbFocus();


        }

        private void treeViewDirectory_AfterExpand(object sender, TreeViewEventArgs e)
        {
            treeViewDirectory.BeginUpdate();
            foreach (TreeNode tn in e.Node.Nodes)
            {
                ShowDirs(tn);
            }
            treeViewDirectory.EndUpdate();
        }

      
 

 
    }
}
