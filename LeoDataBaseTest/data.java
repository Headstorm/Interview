package com.lich.echo7s.api.v1;

import java.text.SimpleDateFormat;
import java.util.*;

public class AA {

    public static void main(String[] args) {
        // request data
        String sql = "select * from table";
        prepareStatement = connection.prepareStatement(sql);
        rs = prepareStatement.executeQuery();
        resultMetaData = rs.getMetaData();
        int cols = resultMetaData.getColumnCount();
        List<Map> currentRow = new List<Map>();
        // encapsulate data
        while (rs.next()) {
            for (int j = 1; j < cols; j++) {
                Map ele = new HashMap<>();
                switch (resultMetaData.getColumnType(j)) {
                    case Types.VARCHAR:
                        ele.put(resultMetaData.getColumnName(j), rs.getString(resultMetaData.getColumnName(j)));
                        currentRow.add(ele);
                        break;
                    case Types.INTEGER:
                        ele.put(resultMetaData.getColumnName(j), new Integer(rs.getInt(resultMetaData.getColumnName(j))));
                        currentRow.add(ele);
                        break;
                    case Types.TIMESTAMP:
                        ele.put(resultMetaData.getColumnName(j), rs.getDate(resultMetaData.getColumnName(j)));
                        currentRow.add(ele);
                        break;
                    case Types.DOUBLE:
                        ele.put(resultMetaData.getColumnName(j), rs.getDouble(resultMetaData.getColumnName(j)));
                        currentRow.add(ele);
                        break;
                    case Types.FLOAT:
                        ele.put(resultMetaData.getColumnName(j), rs.getFloat(resultMetaData.getColumnName(j)));
                        currentRow.add(ele);
                        break;
                    case Types.CLOB:
                        ele.put(resultMetaData.getColumnName(j), rs.getBlob(resultMetaData.getColumnName(j)));
                        currentRow.add(ele);
                        break;
                    default:
                        break;
                }

            }
            System.out.println(currentRow);
        }


        // check table type
        String sql1 = "select column_name, column_comment, data_type from information_schema.columns where table_name = 'table' and table_schema = 'database'"
        prepareStatement = connection.prepareStatement(sql1);
        rs = prepareStatement.executeQuery();
        List<Map> a = new ArrayList<>();
        // type conversion
        while (rs.next()) {
            Map ele = new HashMap();
            currentRow.forEach(item -> {
                Object data = item.get(rs.getString('column_name'));
                switch (rs.getString('data_type')) {
                    case Types.VARCHAR:
                        ele.put(rs.getString('column_name'), String.valueOf(data));
                        a.add(ele);
                        break;
                    case Types.INTEGER:
                        ele.put(rs.getString('column_name'), (Integer) data);
                        a.add(ele);
                        break;
                    case Types.TIMESTAMP:
                        ele.put(rs.getString('column_name'), new SimpleDateFormat('yyyy-MM-dd HH:mm:ss').parse(data).getTime());
                        a.add(ele);
                        break;
                    case Types.DOUBLE:
                        ele.put(rs.getString('column_name'), (Double) data);
                        a.add(ele);
                        break;
                    case Types.FLOAT:
                        ele.put(rs.getString('column_name'), (Float) data);
                        a.add(ele);
                        break;
                    case Types.CLOB:
                        ele.put(rs.getString('column_name'), (Clob) data);
                        a.add(ele);
                        break;
                    default:
                        break;
                }
            });
        }

        // connect sql
        Statement stmt = connection.createStatement();
        StringBuilder sb = new StringBuilder(" insert into table ");
        StringBuilder keys = new StringBuilder(" (");

        StringBuilder values = new StringBuilder();
        for (int i = 0; i < a.size(); i++) {
            values.append("(");
            for (Object key : a.get(i).keySet()) {
                Object value = a.get(i).get(key);
                // connect sql
                if (i == 0) {
                    keys.append(key + ",");
                }
                values.append(value + ",");
            }
            values.append("),");
            values.substring(values.length() - 1);
        }

        sb.append(keys + ") values");
        sb.append(values);

        // print sql
        System.out.println(sb.toString());

        // insert
        stmt.executeUpdate(sb.toString());
    }
}

