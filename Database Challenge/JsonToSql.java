package com.test.mytest.tmp;

import com.google.gson.Gson;
import com.google.gson.annotations.SerializedName;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

import java.io.*;

/**
 * <p>  </p>
 *
 * @author
 * @version $Id: JsonToSql.java, v 0.1 2019/8/15  Exp $
 */
public class JsonToSql {
    public static void main(String[] args) {
        String fullFileName ;
        BufferedReader reader = null;

/*        if (args.length < 1) {
            System.out.print("need input full file name!!");
            System.exit(1);
        }

        fullFileName = args[1];*/
        fullFileName = "d:/tmp/bbb.txt";

        // 校验文件是否存在
        File file =new File(fullFileName);
        if (!file .exists()) {
            System.out.print("file is not exist!!");
            System.exit(1);
        }
        // 打开处理json文件
        try {
            reader = new BufferedReader(new InputStreamReader(new FileInputStream(fullFileName)));
            String lineStr;
            // 循环读取记录
            while ((lineStr = reader.readLine()) != null) {
                // json 转成 对象
                UserInfo userInfo = jsonToObject(lineStr);
                // 打印sql 语句
                printInsertSql(userInfo);
            }
        }catch(Exception e) {
            System.err.println("error," + e);
        }finally {
            try {
                if(reader != null) {
                    reader.close();
                }
            } catch (IOException e) {
                System.err.println("close file error!!," + e);
            }
        }
    }

    /*
     * 打印sql语句
     */
    private static void printInsertSql(UserInfo userInfo) {
        StringBuffer sqlBuffer = new StringBuffer();
        sqlBuffer.append("insert into tm_user_info values ");
        StringBuffer fieldBuffer = new StringBuffer();
        fieldBuffer.append("(");
        StringBuffer valuesBuffer = new StringBuffer();
        valuesBuffer.append(" (");

        if(userInfo.getRecordId() != null){
            fieldBuffer.append("record_id");
            valuesBuffer.append(userInfo.getRecordId());
        } else {
            System.out.print("error! primary key cannot null");
            System.exit(1);
        }

        if (userInfo.getName() != null) {
            fieldBuffer.append(", name");
            valuesBuffer.append(", '" + userInfo.getName() + "'");
        }
        if (userInfo.getCellPhone() != null) {
            fieldBuffer.append(", cell_phone");
            valuesBuffer.append(", '" + userInfo.getCellPhone() + "'");
        }

        if (userInfo.getWorkPhone() != null) {
            fieldBuffer.append(", work_phone");
            valuesBuffer.append(", '" + userInfo.getWorkPhone() + "'");
        }

        if (userInfo.getEmail() != null) {
            fieldBuffer.append(", email");
            valuesBuffer.append(", '" + userInfo.getEmail() + "'");
        }

        if (userInfo.getAddress() != null) {
            fieldBuffer.append(", address");
            valuesBuffer.append(", '" + userInfo.getAddress() + "'");
        }

        if (userInfo.getBasicWidgetOrder() != null) {
            fieldBuffer.append(", basic_widget_order");
            valuesBuffer.append(", " + userInfo.getBasicWidgetOrder());
        }

        if (userInfo.getAdvancedWidgetOrder() != null) {
            fieldBuffer.append(", advance_widget_order");
            valuesBuffer.append(", " + userInfo.getAdvancedWidgetOrder());
        }

        if (userInfo.getProtectionPlan() != null) {
            fieldBuffer.append(", protection_plan");
            valuesBuffer.append(", " + userInfo.getProtectionPlan());
        }

        fieldBuffer.append(")");
        valuesBuffer.append(")");
        sqlBuffer.append(fieldBuffer).append(valuesBuffer).append(";");


        System.out.print(sqlBuffer + "\n");
    }


    private static UserInfo jsonToObject(String str) {
        Gson gson = new Gson();
        return gson.fromJson(str,UserInfo.class);
    }
}

/*
*
* */
class UserInfo {
    @SerializedName("record_id")
    Integer recordId;
    @SerializedName("name")
    String name;
    @SerializedName("cell_phone")
    String cellPhone;
    @SerializedName("work_phone")
    String workPhone;
    @SerializedName("email")
    String email;
    @SerializedName("address")
    String address;
    @SerializedName("basic_widget_order")
    Integer basicWidgetOrder;
    @SerializedName("advanced_widget_order")
    Integer advancedWidgetOrder;
    @SerializedName("protection_plan")
    Boolean protectionPlan;

    public Integer getRecordId() {
        return recordId;
    }

    public void setRecordId(Integer recordId) {
        this.recordId = recordId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCellPhone() {
        return cellPhone;
    }

    public void setCellPhone(String cellPhone) {
        this.cellPhone = cellPhone;
    }

    public String getWorkPhone() {
        return workPhone;
    }

    public void setWorkPhone(String workPhone) {
        this.workPhone = workPhone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getBasicWidgetOrder() {
        return basicWidgetOrder;
    }

    public void setBasicWidgetOrder(Integer basicWidgetOrder) {
        this.basicWidgetOrder = basicWidgetOrder;
    }

    public Integer getAdvancedWidgetOrder() {
        return advancedWidgetOrder;
    }

    public void setAdvancedWidgetOrder(Integer advancedWidgetOrder) {
        this.advancedWidgetOrder = advancedWidgetOrder;
    }

    public Boolean getProtectionPlan() {
        return protectionPlan;
    }

    public void setProtectionPlan(Boolean protectionPlan) {
        this.protectionPlan = protectionPlan;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }
}
